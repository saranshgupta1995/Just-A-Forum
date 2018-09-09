const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {    
    if (req.body["username"] && req.body["password"]) {

        let deviceId = (10000 * Math.random()).toString();
        jwt.sign({ user: req.body.username, deviceId }, 'secretkey', (err, token) => {
            req.token = token;
            req.deviceId=deviceId;
            next();
        })
    } else {
        let authHeader = req.headers['author'];
        if (authHeader) {
            jwt.verify(authHeader, 'secretkey', (err, authData) => {
                if (err) {
                    console.log('verification failed, 403')
                    res.sendStatus(403);
                } else {
                    if (req.body['token'] == 'my_uniq_token') {
                        req.body.authData=authData;
                    }
                    next();
                }
            })
        } else {
            console.log('no auth header found, 403')
            res.sendStatus(403);
        }
    }
}