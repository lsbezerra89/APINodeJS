const express = require('express');
const router = express.Router();

const auth = require('../Middlewares/auth');

router.post('/', (req, res) => {
    return res.send(
        { message: 'eveything okay' }
    );
});

router.get('/', auth, (req, res) => {
    return res.send(
        { message: 'Testing auth' }
    );
});

module.exports = router;