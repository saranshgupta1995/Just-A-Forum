var router = require('express').Router();
var loginSignupDbOpr=require('./../database/loginSignupDbOperations');
loginSignupDbOpr.emailer = require('../businessLayer/Emailer.js');

router.use(function (req, res, next) {
    console.log("recieved another request");
    next();
});

router.get('/', (req, res) => {
    res.send('recieved get');
});

router.get('/verify', (req, res) => {
    console.log(req.query.a);
});

router.post('/addNewUser',(req, res)=>{
    loginSignupDbOpr.addLoginDetails(req.body).then((oprRes) => {
        res.send({
            'status':oprRes.insertedCount==1
        });
        loginSignupDbOpr.emailer.mailOptions.to=req.body.email;
        loginSignupDbOpr.emailer.mailOptions.subject='Account Verification';
        loginSignupDbOpr.emailer.mailOptions.html=`
        <h4>Account Verification Email</h4>
        <p style="margin:4px;">Thanks for Signing Up with DeSocialize.</p>
        <p style="margin:4px;">You must follow this link to activate your account</p>
        <p>http://localhost:3000/${oprRes.insertedId}</p>
        <p style="margin-bottom:4px;">Thanks and Regards</p>
        <p style="margin-top:4px;">Saransh Gupta</p>
        `;
        loginSignupDbOpr.emailer.sendMail();
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