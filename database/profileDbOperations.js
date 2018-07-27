let profileDbOpr = {};

var ObjectId = require('mongodb').ObjectID;

profileDbOpr.dbOpr = require('./dbOperations.js');
profileDbOpr.tableName = 'UserProfiles';

profileDbOpr.addProfile = function (username) {
    return '';
}

module.exports = profileDbOpr;

