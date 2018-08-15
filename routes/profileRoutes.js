var router = require('express').Router();
var profileDbOperations = require('./../database/profileDbOperations');
const validateReq = require('./../middlewares/Validation.js');

router.post('/getprofile', validateReq, (req, res) => {
    profileDbOperations.findProfile(req.body.username).then(oprRes => {
        res.send(oprRes);
    })
});

router.post('/addWorth', validateReq, (req, res) => {
    profileDbOperations.addWorth(req.body.username, req.body.worth).then(oprRes => {
        res.send(oprRes);
    })
});


module.exports = router;

