let profileDbOpr = {};

profileDbOpr.dbOpr = require('./dbOperations.js');
profileDbOpr.tableName = 'UserProfiles';

profileDbOpr.addProfile = function (username, coun) {
    return profileDbOpr.dbOpr.insertOneOpr(profileDbOpr.tableName, {
        username: username,
        userId:coun+1,
        exp_level: 'zero',
        lvl_score: 0,
        worth: 0,
    });
}

profileDbOpr.findProfile = function (username) {
    return profileDbOpr.dbOpr.findDoc(profileDbOpr.tableName, {
        username: username,
    }).then(oprRes => {
        if (!oprRes.length) {
            return { 'userName': 'not found' };
        } else {
            return oprRes[0]
        }
    });
}

module.exports = profileDbOpr;

