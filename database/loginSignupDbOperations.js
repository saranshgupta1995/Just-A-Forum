let loginSignupDbOpr = {};

var ObjectId = require('mongodb').ObjectID;

loginSignupDbOpr.dbOpr = require('./dbOperations.js');
loginSignupDbOpr.tableName = 'LoginDetails';

loginSignupDbOpr.addLoginDetails = function (loginObj) {
    loginObj.unverified = true;
    return loginSignupDbOpr.dbOpr.insertOneOpr(loginSignupDbOpr.tableName, loginObj);
}

loginSignupDbOpr.dropColl = function (coll) {
    return loginSignupDbOpr.dbOpr.dropCollOpr(loginSignupDbOpr.tableName);
}

loginSignupDbOpr.checkEmailExistance = function (emailId) {
    return loginSignupDbOpr.dbOpr.findOpr(loginSignupDbOpr.tableName, { email: emailId })
}

loginSignupDbOpr.checkUsernameExistance = function (username) {
    return loginSignupDbOpr.dbOpr.findOpr(loginSignupDbOpr.tableName, { userName: username })
}

loginSignupDbOpr.validateUserLogin = function (loginObj) {
    return loginSignupDbOpr.dbOpr.findDoc(loginSignupDbOpr.tableName, loginObj).then(oprRes => {
        return oprRes.hasNext().then(x => {
            if (!x) {
                return { 'userName': 'not found' };
            } else {
                return oprRes.next().then(y => {
                    return y
                })
            }
        })

        // oprRes.forEach(doc => {
        //     returnDoc=doc;
        // })

    });
}

loginSignupDbOpr.verifyAccount = function (primaryId) {
    return loginSignupDbOpr.dbOpr.updateOne(loginSignupDbOpr.tableName, { _id: ObjectId(primaryId), unverified: true }, { $set: { unverified: false } });
}

module.exports = loginSignupDbOpr;

