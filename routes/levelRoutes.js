var router = require('express').Router();
var levelDbOpr = require('./../database/levelDbOperations');
const validateReq = require('./../middlewares/Validation.js');

router.post('/levelZeroUserData', validateReq, (req, res) => {
    levelDbOpr.initLevelZero(req.body.username).then(oprRes => {
        res.send({
            unverified: oprRes.unverified,
            username: oprRes.userName
        })
    })
})

router.post('/findUserLevelData', validateReq, (req, res) => {
    levelDbOpr.findLevelData(req.body.username, req.body.exp_level).then(oprRes => {
        res.send(oprRes);
    })
})

router.post('/updatelevelprogress', validateReq, (req, res) => {
    levelDbOpr.findLevelData(req.body.username, req.body.exp_level).then(oprRes => {
        res.send(oprRes);
    })
})

router.get('/deleteuserlevel', validateReq, (req, res) => {
    levelDbOpr.deleteUserLevel('saransh', 'zero').then(oprRes => {
        res.send(oprRes);
    })
})

router.get('/setuserlevel', validateReq, (req, res) => {
    levelDbOpr.setUserLevel('saransh', 'zero').then(oprRes => {
        res.send(oprRes);
    })
})

module.exports = router;