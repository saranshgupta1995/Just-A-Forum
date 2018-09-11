var router = require('express').Router();
var profileDbOperations = require('./../database/profileDbOperations');
const validateReq = require('./../middlewares/Validation.js');
var levelDbOperation = require('./../database/levelDbOperations')
var levelController = require('./../utils/LevelController')

router.post('/getprofile', validateReq, (req, res) => {
    profileDbOperations.findProfile(req.body.username).then(oprRes => {
        res.send(oprRes);
    })
});

router.post('/addWorth', validateReq, (req, res) => {
    profileDbOperations.addWorth(req.body.username, req.body.worth).then(oprRes => {
        levelController.getLevel(req.body.username,{
            worth:req.body.worth
        }).then(levelObj=>{
            if (levelObj.hasChange) {
                levelDbOperation.setUserLevel(req.body.username, levelObj.level).then(x => {
                    profileDbOperations.updateLevel(req.body.username, levelObj.level).then(y=>{
                        res.send(y)
                    })
                })
            } else {
                res.send(oprRes);
            }
        })

    })
});


module.exports = router;

