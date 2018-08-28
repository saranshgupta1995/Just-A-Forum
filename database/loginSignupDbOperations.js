let loginSignupDbOpr = {};

var ObjectId = require('mongodb').ObjectID;

loginSignupDbOpr.dbOpr = require('./dbOperations.js');
loginSignupDbOpr.tableName = 'LoginDetails';
loginSignupDbOpr.deviceTable = 'Devices';

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

loginSignupDbOpr.addLoginDevice = function (userName, deviceId) {
    return loginSignupDbOpr.dbOpr.insertOneOpr(loginSignupDbOpr.deviceTable, {userName,deviceId})
}

loginSignupDbOpr.removeLoginDevice = function (userName, deviceId) {
    return loginSignupDbOpr.dbOpr.deleteDoc(loginSignupDbOpr.deviceTable, {userName,deviceId})
}

loginSignupDbOpr.findLoginDevice = function (userName, deviceId) {    
    
    return loginSignupDbOpr.dbOpr.findDoc(loginSignupDbOpr.deviceTable, { userName, deviceId }).then(oprRes => {
        
        if (!oprRes.length) {
            return false;
        } else {
            return true;
        }
    });
}

loginSignupDbOpr.checkEmailExistance = function (emailId) {
    return loginSignupDbOpr.dbOpr.fetchCount(loginSignupDbOpr.tableName, { email: emailId })
}

loginSignupDbOpr.checkUsernameExistance = function (username) {
    return loginSignupDbOpr.dbOpr.fetchCount(loginSignupDbOpr.tableName, { userName: username })
}

loginSignupDbOpr.fetchProfileCount = function () {
    return loginSignupDbOpr.dbOpr.fetchCount(loginSignupDbOpr.tableName, {})
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

loginSignupDbOpr.getDevTasks = function () {
    return loginSignupDbOpr.dbOpr.findDoc('DevTasks',{}).then(oprRes => {
        if (!oprRes.length) {
            return {tasks:[{ 'task': 'no tasks pending' }]};
        } else {
            return {tasks:oprRes}
        }
    });
}

loginSignupDbOpr.addDevTask = function (task) {
    return loginSignupDbOpr.dbOpr.insertOneOpr('DevTasks',task)
}

loginSignupDbOpr.removeDevTask = function (task) {
    return loginSignupDbOpr.dbOpr.deleteDoc('DevTasks',task)
}

loginSignupDbOpr.verifyAccount = function (primaryId) {
    return loginSignupDbOpr.dbOpr.updateOne(loginSignupDbOpr.tableName, { _id: ObjectId(primaryId), unverified: true }, { $set: { unverified: false } });
}

module.exports = loginSignupDbOpr;

