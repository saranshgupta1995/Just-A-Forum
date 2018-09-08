let profileDbOpr = {};

profileDbOpr.dbOpr = require('./dbOperations.js');
profileDbOpr.tableName = 'UserProfiles';

profileDbOpr.addProfile = function (username, coun) {
    console.log('pikachu')
    return profileDbOpr.dbOpr.insertOneOpr(profileDbOpr.tableName, {
        username: username,
        userId:coun+1,
        exp_level: 'zero',
        lvl_score: 0,
        worth: 100,
    });
}

profileDbOpr.addWorth = function (username, worth) {
    return profileDbOpr.dbOpr.updateOne(profileDbOpr.tableName, {
        username: username
    }, { $set: { worth: worth }});
}

profileDbOpr.updateLevel = function (username, level) {
    return profileDbOpr.dbOpr.updateOne(profileDbOpr.tableName, {
        username: username
    }, { $set: { exp_level: level }});
}

profileDbOpr.findProfile = function (username) {
    return profileDbOpr.dbOpr.findDoc(profileDbOpr.tableName, {
        username: username,
    }).then(oprRes => {
        if (!oprRes.length) {
            return { 'username': 'not found' };
        } else {
            return oprRes[0]
        }
    });
}

module.exports = profileDbOpr;

