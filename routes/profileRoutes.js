var router = require('express').Router();
var profileDbOperations = require('./../database/profileDbOperations');

router.post('/getprofile', (req, res) => {
    profileDbOperations.findProfile(req.body.username).then(oprRes => {
        res.send(oprRes);
    })
});

router.post('/addWorth', (req, res) => {
    profileDbOperations.addWorth(req.body.username, req.body.worth).then(oprRes => {
        res.send(oprRes);
    })
});


module.exports = router;

