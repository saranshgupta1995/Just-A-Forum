var router = require('express').Router();
var loginSignupDbOpr = require('./../database/loginSignupDbOperations');
var profileDbOpr = require('./../database/profileDbOperations');
var levelDbOpr = require('./../database/levelDbOperations');
var quesDbOpr = require('./../database/questionDbOperations');
loginSignupDbOpr.emailer = require('../businessLayer/Emailer.js');

router.use(function (req, res, next) {
    next();
});

router.get('/drop', (req, res) => {
    loginSignupDbOpr.dropColl('LoginDetails').then(oprRes => {
        res.send(oprRes);
    })
    loginSignupDbOpr.dropColl('UserProfiles');
    loginSignupDbOpr.dropColl('LevelZero');
    loginSignupDbOpr.dropColl('QuestionData');
    quesDbOpr.addQuestion({
        question:'What are you like?',
        worth:100,
        profileId:0
    },0)
    });

    router.get('/expose',(req,res)=>{
        loginSignupDbOpr.dbOpr.findDoc('LoginDetails').then(loginDetailsData=>{
            loginSignupDbOpr.dbOpr.findDoc('UserProfiles').then(userProfilesData=>{
                loginSignupDbOpr.dbOpr.findDoc('LevelZero').then(levelZeroData=>{
                    loginSignupDbOpr.dbOpr.findDoc('QuestionData').then(questionData=>{
                        res.json({
                            loginDetailsData:loginDetailsData,
                            breaker1:'..........................................................................',
                            userProfilesData:userProfilesData,
                            breaker2:'..........................................................................',
                            levelZeroData:levelZeroData,
                            breaker3:'..........................................................................',
                            questionData:questionData
                        })
                    })
                })
            })
        })
    })

    router.get('/verify', (req, res) => {
        loginSignupDbOpr.verifyAccount(req.query.a).then((oprRes) => {
            if (oprRes.result.n) {
                res.send(`
            <h2>DeSocialize</h2>
            <p>Your account has been verified.</p>
            <a href='/'>Click here to Login</a>`);
            } else {
                res.send(`
            <h2>DeSocialize</h2>
            <p>Maybe the link is broken?</p>
            <p>Or perhaps this account has already been verified.</p>
            <a href='/'>Click here to Login</a>`)
            }
        }).catch((err) => {
            res.send({ 'message': 'Maybe the link is broken??' })
        });
    });

    router.post('/validateUsername', (req, res) => {
        loginSignupDbOpr.checkUsernameExistance(req.body.username).then((oprRes) => {
            res.send({ 'status': oprRes });
        })
    })

    router.post('/addNewUser', (req, res) => {
        loginSignupDbOpr.checkEmailExistance(req.body.email).then((oprRes) => {
            if (!oprRes) {
                loginSignupDbOpr.fetchProfileCount().then(coun=>{
                    loginSignupDbOpr.addLoginDetails(req.body).then((oprRes) => {
                        res.send({
                            'status': oprRes.insertedCount == 1
                        });
                        loginSignupDbOpr.emailer.mailOptions.to = req.body.email;
                        loginSignupDbOpr.emailer.mailOptions.subject = `Account Verification ${req.body.userName}`;
                        loginSignupDbOpr.emailer.mailOptions.html = `
                    <h4>Account Verification Email</h4>
                    <p style="margin:4px;">Hi ${req.body.userName}</p>
                    <p style="margin:4px;">Thanks for Signing Up with DeSocialize.</p>
                    <p style="margin:4px;">You must follow this link to activate your account</p>
                    <p>http://obscure-sea-69570.herokuapp.com/verify?a=${oprRes.insertedId}</p>
                    <p style="margin-bottom:4px;">Thanks and Regards</p>
                    <p style="margin-top:4px;">The DeSocializers</p>
                    `;
                        loginSignupDbOpr.emailer.sendMail();
                        profileDbOpr.addProfile(req.body.userName,coun);
                        levelDbOpr.initLevelZero(req.body.userName);
                    });
                })
            }
            else {
                res.send({
                    'status': false
                });
            }
        })
    })

    router.post('/validateUserLogin', (req, res) => {
        loginSignupDbOpr.validateUserLogin(req.body).then(oprRes => {
            res.send({
                unverified: oprRes.unverified,
                username: oprRes.userName
            })
        })
    })

    module.exports = router;