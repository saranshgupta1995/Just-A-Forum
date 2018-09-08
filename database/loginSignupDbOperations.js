let loginSignupDbOpr = {};

var ObjectId = require('mongodb').ObjectID;

loginSignupDbOpr.dbOpr = require('./dbOperations.js');
loginSignupDbOpr.tableName = 'LoginDetails';
loginSignupDbOpr.deviceTable = 'Devices';

loginSignupDbOpr.addLoginDetails = function (loginObj) {
    if (loginObj.social) {
        loginObj.unverified = false;
        delete loginObj.social
    } else {
        loginObj.unverified = true;
        if (loginObj.username == 'saransh') {
            loginObj.unverified = false;
        }
    }
    return loginSignupDbOpr.dbOpr.insertOneOpr(loginSignupDbOpr.tableName, loginObj);
}

loginSignupDbOpr.dropColl = function (coll) {
    return loginSignupDbOpr.dbOpr.dropCollOpr(coll);
}

loginSignupDbOpr.addLoginDevice = function (username, deviceId) {
    return loginSignupDbOpr.dbOpr.insertOneOpr(loginSignupDbOpr.deviceTable, { username, deviceId })
}

loginSignupDbOpr.removeLoginDevice = function (username, deviceId) {
    return loginSignupDbOpr.dbOpr.deleteDoc(loginSignupDbOpr.deviceTable, { username, deviceId })
}

loginSignupDbOpr.findLoginDevice = function (username, deviceId) {

    return loginSignupDbOpr.dbOpr.findDoc(loginSignupDbOpr.deviceTable, { username, deviceId }).then(oprRes => {

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
    return loginSignupDbOpr.dbOpr.fetchCount(loginSignupDbOpr.tableName, { username: username })
}

loginSignupDbOpr.fetchProfileCount = function () {
    return loginSignupDbOpr.dbOpr.fetchCount(loginSignupDbOpr.tableName, {})
}

loginSignupDbOpr.validateUserLogin = function (loginObj) {
    return loginSignupDbOpr.dbOpr.findDoc(loginSignupDbOpr.tableName, loginObj).then(oprRes => {
        if (!oprRes.length) {
            return { 'username': 'not found' };
        } else {
            return oprRes[0]
        }
    });
}

loginSignupDbOpr.getDevTasks = function () {
    return loginSignupDbOpr.dbOpr.findDoc('DevTasks', {}).then(oprRes => {
        if (!oprRes.length) {
            return { tasks: [{ 'task': 'no tasks pending' }] };
        } else {
            return { tasks: oprRes }
        }
    });
}

loginSignupDbOpr.addDevTask = function (task) {
    return loginSignupDbOpr.dbOpr.insertOneOpr('DevTasks', task)
}

loginSignupDbOpr.removeDevTask = function (task) {
    return loginSignupDbOpr.dbOpr.deleteDoc('DevTasks', task)
}

loginSignupDbOpr.verifyAccount = function (primaryId) {
    return loginSignupDbOpr.dbOpr.updateOne(loginSignupDbOpr.tableName, { _id: ObjectId(primaryId), unverified: true }, { $set: { unverified: false } });
}

module.exports = loginSignupDbOpr;

