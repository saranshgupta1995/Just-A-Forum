var router = require('express').Router();
var profileDbOperations = require('./../database/profileDbOperations');

router.post('/profile', (req, res) => {
    let user = req.body.username
    
    profileDbOperations.dbOpr.findDoc('UserProfiles', { username: user }).then(oprRes => {
        oprRes.forEach(x => {
            res.send(x);
        })
    })

});


module.exports = router;

