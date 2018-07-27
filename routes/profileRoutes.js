var router = require('express').Router();
var profileDbOperations = require('./../database/profileDbOperations');

router.get('/profile', (req, res) => {
    let user = req.query.a
    
    profileDbOperations.dbOpr.findDoc('UserProfiles', { username: user }).then(oprRes => {
        oprRes.forEach(x => {
            res.send(x);
        })
    })

});


module.exports = router;

