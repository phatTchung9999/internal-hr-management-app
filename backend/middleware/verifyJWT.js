const jwt = require('jsonwebtoken');
const ROLES_LIST = require('../config/roles_list');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                if (process.env.NODE_ENV !== 'production') {
                    req.user = 'local-dev';
                    req.roles = [ROLES_LIST.User];
                    return next();
                }

                return res.sendStatus(403);
            }
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT;
