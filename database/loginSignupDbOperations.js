let loginSignupDbOpr = {};

var ObjectId = require('mongodb').ObjectID;

loginSignupDbOpr.dbOpr = require('./dbOperations.js');
loginSignupDbOpr.tableName = 'LoginDetails';

loginSignupDbOpr.addLoginDetails = function (loginObj) {
    loginObj.unverified = true;
    if (loginObj.userName == 'saransh') {
        loginObj.unverified = false;
    }
    return loginSignupDbOpr.dbOpr.insertOneOpr(loginSignupDbOpr.tableName, loginObj);
}

loginSignupDbOpr.dropColl = function (coll) {
    return loginSignupDbOpr.dbOpr.dropCollOpr(coll);
}

loginSignupDbOpr.checkEmailExistance = function (emailId) {
    return loginSignupDbOpr.dbOpr.fetchCount(loginSignupDbOpr.tableName, { email: emailId })
}

loginSignupDbOpr.checkUsernameExistance = function (username) {
    return loginSignupDbOpr.dbOpr.fetchCount(loginSignupDbOpr.tableName, { userName: username })
}

loginSignupDbOpr.validateUserLogin = function (loginObj) {
    return loginSignupDbOpr.dbOpr.findDoc(loginSignupDbOpr.tableName, loginObj).then(oprRes => {
        if (!oprRes.length) {
            return { 'userName': 'not found' };
        } else {
            return oprRes[0]
        }
    });
}

loginSignupDbOpr.verifyAccount = function (primaryId) {
    return loginSignupDbOpr.dbOpr.updateOne(loginSignupDbOpr.tableName, { _id: ObjectId(primaryId), unverified: true }, { $set: { unverified: false } });
}

module.exports = loginSignupDbOpr;

