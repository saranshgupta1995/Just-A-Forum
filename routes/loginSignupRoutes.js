var router = require('express').Router();
var loginSignupDbOpr = require('./../database/loginSignupDbOperations');
var profileDbOpr = require('./../database/profileDbOperations');
var levelDbOpr = require('./../database/levelDbOperations');
var quesDbOpr = require('./../database/questionDbOperations');
const validateReq = require('./../middlewares/Validation.js');

loginSignupDbOpr.emailer = require('../utils/Emailer.js');

router.use(function (req, res, next) {
    next();
});

router.get('/drop', (req, res) => {
    loginSignupDbOpr.dropColl('LoginDetails').then(oprRes => {
        res.send(oprRes);
    }).catch(x => {

    })
    loginSignupDbOpr.dropColl('UserProfiles').catch(x => {

    });
    loginSignupDbOpr.dropColl('LevelZero').catch(x => {

    });
    loginSignupDbOpr.dropColl('Comments').catch(x => {

    });
    loginSignupDbOpr.dropColl('Devices').catch(x => {

    });
    loginSignupDbOpr.dropColl('Tags').catch(x => {

    });
    loginSignupDbOpr.dropColl('QuestionData').then(x => {
        quesDbOpr.addQuestion({
            question: 'What are you like?',
            worth: 100,
            profileId: 0,
            tags: [['dev-tasks', 'Developer Tasks'], ['real-world-questions', 'Couldnt think of a clever tag']]
        }, 0)
    }, y => {
        quesDbOpr.addQuestion({
            question: 'What are you like?',
            worth: 100,
            profileId: 0,
            tags: [['dev-tasks', 'Developer Tasks'], ['real-world-questions', 'Couldnt think of a clever tag']]

        }, 0)
    });
});

router.get('/expose', (req, res) => {
    loginSignupDbOpr.dbOpr.findDoc('LoginDetails').then(loginDetailsData => {
        loginSignupDbOpr.dbOpr.findDoc('UserProfiles').then(userProfilesData => {
            loginSignupDbOpr.dbOpr.findDoc('LevelZero').then(levelZeroData => {
                loginSignupDbOpr.dbOpr.findDoc('QuestionData').then(questionData => {
                    loginSignupDbOpr.dbOpr.findDoc('Comments').then(comments => {
                        loginSignupDbOpr.dbOpr.findDoc('Devices').then(devices => {
                            loginSignupDbOpr.dbOpr.findDoc('Tags').then(tags => {
                                res.json({
                                    loginDetailsData,
                                    breaker1: '..........................................................................',
                                    userProfilesData,
                                    breaker2: '..........................................................................',
                                    levelZeroData,
                                    breaker3: '..........................................................................',
                                    questionData,
                                    breaker4: '..........................................................................',
                                    tags,
                                    breaker5: '..........................................................................',
                                    comments,
                                    breaker6: '..........................................................................',
                                    devices
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

router.get('/show', (req, res) => {
    loginSignupDbOpr.dbOpr.findDoc(req.query.a).then(x => {
        res.json({ x })
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

router.post('/showDevTasks', (req, res) => {
    loginSignupDbOpr.getDevTasks().then((oprRes) => {
        res.send(oprRes);
    })
})

router.post('/deleteDevTask', (req, res) => {

    loginSignupDbOpr.removeDevTask(req.body).then((oprRes) => {
        res.send(oprRes);
    })
})

router.post('/addDevTasks', (req, res) => {
    loginSignupDbOpr.addDevTask(req.body).then((oprRes) => {
        res.send(oprRes);
    })
})

router.post('/addNewUser', (req, res) => {
    if (req.body.social) {
        loginSignupDbOpr.fetchProfileCount().then(coun => {
            loginSignupDbOpr.addLoginDetails(req.body).then((oprRes) => {
                res.send({
                    'status': oprRes.insertedCount == 1
                });
                loginSignupDbOpr.emailer.mailOptions.to = req.body.email;
                loginSignupDbOpr.emailer.mailOptions.subject = `Account Login Alert, ${req.body.username}.`;
                loginSignupDbOpr.emailer.mailOptions.html = `
                <h4>Account Login Successful</h4>
                <p style="margin:4px;">Hi ${req.body.username}</p>
                <p style="margin:4px;">Thanks for Signing Up with DeSocialize.</p>
                <p style="margin:4px;">Stay tuned for more updates.</p>
                <p style="margin-bottom:4px;">Thanks and Regards,</p>
                <p style="margin-top:4px;">The DeSocializers</p>
                `;
                loginSignupDbOpr.emailer.sendMail();
                profileDbOpr.addProfile(req.body.username, coun);
                levelDbOpr.initLevelZero(req.body.username);
            });
        });
        
    } else {
        loginSignupDbOpr.checkEmailExistance(req.body.email).then((oprRes) => {


            if (!oprRes) {
                loginSignupDbOpr.fetchProfileCount().then(coun => {
                    loginSignupDbOpr.addLoginDetails(req.body).then((oprRes) => {
                        res.send({
                            'status': oprRes.insertedCount == 1
                        });
                        loginSignupDbOpr.emailer.mailOptions.to = req.body.email;
                        if (req.body['social']) {
                            loginSignupDbOpr.emailer.mailOptions.subject = `Account Login Alert, ${req.body.username}.`;
                            loginSignupDbOpr.emailer.mailOptions.html = `
                            <h4>Account Login Successful</h4>
                            <p style="margin:4px;">Hi ${req.body.username}</p>
                            <p style="margin:4px;">Thanks for Signing Up with DeSocialize.</p>
                            <p style="margin:4px;">Stay tuned for more updates.</p>
                            <p style="margin-bottom:4px;">Thanks and Regards,</p>
                            <p style="margin-top:4px;">The DeSocializers</p>
                            `;

                        } else {
                            loginSignupDbOpr.emailer.mailOptions.subject = `Account Verification ${req.body.username}`;

                            loginSignupDbOpr.emailer.mailOptions.html = `
                    <h4>Account Verification Email</h4>
                    <p style="margin:4px;">Hi ${req.body.username}</p>
                    <p style="margin:4px;">Thanks for Signing Up with DeSocialize.</p>
                    <p style="margin:4px;">You must follow this link to activate your account</p>
                    <p>http://obscure-sea-69570.herokuapp.com/verify?a=${oprRes.insertedId}</p>
                    <p style="margin-bottom:4px;">Thanks and Regards</p>
                    <p style="margin-top:4px;">The DeSocializers</p>
                    `;
                        }
                        loginSignupDbOpr.emailer.sendMail();
                        profileDbOpr.addProfile(req.body.username, coun);
                        levelDbOpr.initLevelZero(req.body.username);
                    });
                })
            }
            else {
                res.send({
                    'status': false
                });
            }
        })
    }
})

router.post('/validateUserLogin', validateReq, (req, res) => {
    loginSignupDbOpr.validateUserLogin(req.body).then(oprRes => {


        resObj = {
            unverified: oprRes.unverified,
            username: oprRes.username,
        }
        if (resObj['username'] != 'not found') {
            resObj.token = req.token;
            resObj.deviceId = req.deviceId;

            loginSignupDbOpr.addLoginDevice(resObj.username, resObj.deviceId)
        }
        res.send(resObj);

    })
})

router.post('/validatetoken', validateReq, (req, res) => {
    loginSignupDbOpr.findLoginDevice(req.body.authData.user, req.headers['device']).then(oprRes => {
        if (oprRes) {
            res.send(req.body.authData)
        } else {
            res.sendStatus(403)
        }
    }

    )
})

router.post('/logoutuser', validateReq, (req, res) => {
    loginSignupDbOpr.removeLoginDevice(req.body.username, req.headers['device']);
    res.end();
})

module.exports = router;