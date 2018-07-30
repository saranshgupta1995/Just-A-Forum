let profileDbOpr = {};

profileDbOpr.dbOpr = require('./dbOperations.js');
profileDbOpr.tableName = 'UserProfiles';

profileDbOpr.addProfile = function (username) {
    return profileDbOpr.dbOpr.insertOneOpr(profileDbOpr.tableName, {
        username: username,
        exp_level: 'zero',
        ques_ids: [],
        lvl_score: 0,
        worth: 0,
        comment_ids: []
    });
}

profileDbOpr.findProfile = function (username) {
    return profileDbOpr.dbOpr.findDoc(profileDbOpr.tableName, {
        username: username,
    }).then(oprRes=>{
        if (!oprRes.length) {
            return { 'userName': 'not found' };
        } else {
            return oprRes[0]
        }
    });
}

module.exports = profileDbOpr;

