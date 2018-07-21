let loginSignupDbOpr={};

var ObjectId = require('mongodb').ObjectID;

loginSignupDbOpr.dbOpr = require('./dbOperations.js');
loginSignupDbOpr.tableName = 'LoginDetails';

loginSignupDbOpr.addLoginDetails = function (loginObj){
    loginObj.unverified=true;
    return loginSignupDbOpr.dbOpr.insertOneOpr(loginSignupDbOpr.tableName,loginObj);
}

loginSignupDbOpr.validateUserLogin = function (loginObj){
    return loginSignupDbOpr.dbOpr.findOpr(loginSignupDbOpr.tableName,loginObj);
}

loginSignupDbOpr.verifyAccount = function (primaryId){
    return loginSignupDbOpr.dbOpr.updateOne(loginSignupDbOpr.tableName,{_id:ObjectId(primaryId),unverified:true},{$set:{unverified:false}});
}

module.exports=loginSignupDbOpr;

