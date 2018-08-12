var router = require('express').Router();
var levelDbOpr=require('./../database/levelDbOperations');

router.post('/levelZeroUserData', (req, res) => {
    levelDbOpr.initLevelZero(req.body.username).then(oprRes => {        
        res.send({
            unverified: oprRes.unverified,
            username: oprRes.userName
        })
    })
})

router.post('/findUserLevelData',(req,res)=>{
    levelDbOpr.findLevelData(req.body.username,req.body.exp_level).then(oprRes=>{
        res.send(oprRes);
    })
})

module.exports = router;