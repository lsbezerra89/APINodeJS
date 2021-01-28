const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');

const auth = require('../Middlewares/auth');
const configs = require('../Config/configs');

router.get('/', auth, async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro to find users' });
    }
});


router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: 'Invalid data' });
    }

    try {
        const user = await Users.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        const isPassOk = await bcrypt.compare(password, user.password);

        if (!isPassOk) {
            return res.status(401).send({ error: 'Error authenticating' });
        }

        user.password = undefined;
        return res.send({ user, token: generateUserToken(user.id) });

    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Error to find users' });
    }
});

router.post('/create', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: 'Invalid data' });
    }

    try {
        if (await Users.findOne({ email })) {
            return res.status(400).send({ error: 'User already registered' });
        }

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({ user, token: generateUserToken(user.id) });
    }
    catch (err) {
        return res.status(500).send({ error: 'Error to find users' });
    }
});

const generateUserToken = (userId) => {
    return jwt.sign(
        { id: userId },
        configs.jwt_password,
        { expiresIn: configs.jwt_expires }
    );
}

module.exports = router;