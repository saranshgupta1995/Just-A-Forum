var router = require('express').Router();
var loginSignupDbOpr = require('./../database/profileDbOperations');

router.get('/profile', (req, res) => {
        res.send('pika');
});


module.exports = router;

