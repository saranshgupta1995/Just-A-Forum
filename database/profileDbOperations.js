let profileDbOpr = {};


profileDbOpr.dbOpr = require('./dbOperations.js');
profileDbOpr.tableName = 'UserProfiles';

profileDbOpr.addProfile = function (username) {
    
    return profileDbOpr.dbOpr.insertOneOpr(profileDbOpr.tableName,{
    username:username,
    exp_level:0,
    ques_ids:[],
    lvl_score:0,
    worth:0,
    comment_ids:[]
    });
}

module.exports = profileDbOpr;

