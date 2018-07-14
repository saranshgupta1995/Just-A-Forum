var router = require('express').Router();
var loginSignupDbOpr=require('./../database/loginSignupDbOperations');

router.use(function (req, res, next) {
    console.log("recieved another request");
    next();
});

router.get('/', (req, res) => {
    res.send('recieved get');
})

router.post('/addNewUser',(req, res)=>{
    loginSignupDbOpr.addLoginDetails(req.body).then((oprRes)=>{
        res.send({
            'status':oprRes
        })
    });
})

router.post('/validateUserLogin',(req, res)=>{
    loginSignupDbOpr.validateUserLogin(req.body).then((oprRes)=>{
        res.send({
            'status':oprRes
        })
    });
})

module.exports = router;