const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    if (req.body["userName"] && req.body["password"]) {
        jwt.sign({ user: req.body.userName, address: (req.connection.remoteAddress || req.socket.remoteAddress) }, 'secretkey', (err, token) => {
            req.token = token;
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
                    
                    if (authData.address != (req.connection.remoteAddress || req.socket.remoteAddress)) {
                        console.log('different ip, 403')
                        res.sendStatus(403);
                    } else {
                        if(req.body['token']=='my_uniq_token'){
                            res.send(authData)
                        }else{
                            next();
                        }
                    }

                }
            })
        } else {
            console.log('no auth header found, 403')
            res.sendStatus(403);
        }
    }
}