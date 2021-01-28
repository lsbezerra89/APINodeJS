const jwt = require('jsonwebtoken');
const config = require('../Config/configs');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if (!token_header) {
        return res.status(401).send({ error: 'Token not sent' });
    }


    jwt.verify(token_header, config.jwt_password, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = auth;