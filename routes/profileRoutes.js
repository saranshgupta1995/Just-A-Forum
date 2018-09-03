var router = require('express').Router();
var profileDbOperations = require('./../database/profileDbOperations');
const validateReq = require('./../middlewares/Validation.js');
var levelDbOperation = require('./../database/levelDbOperations')

router.post('/getprofile', validateReq, (req, res) => {
    profileDbOperations.findProfile(req.body.username).then(oprRes => {
        res.send(oprRes);
    })
});

router.post('/addWorth', validateReq, (req, res) => {
    profileDbOperations.addWorth(req.body.username, req.body.worth).then(oprRes => {
        let newLevel = {
            200: 'one'
        }[req.body.worth.toString()]
        if (newLevel) {
            levelDbOperation.setUserLevel(req.body.username, newLevel).then(x => {
                profileDbOperations.updateLevel(req.body.username, newLevel).then(y=>{
                    res.send(y)
                })
            })
        } else {
            res.send(oprRes);
        }

    })
});


module.exports = router;

