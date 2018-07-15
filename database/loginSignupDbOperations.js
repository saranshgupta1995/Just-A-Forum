let loginSignupDbOpr={};

loginSignupDbOpr.dbOpr = require('./dbOperations.js');
loginSignupDbOpr.tableName = 'LoginDetails';

loginSignupDbOpr.addLoginDetails = function (loginObj){
    console.log('adding details')
    loginObj.unverified=true;
    return loginSignupDbOpr.dbOpr.insertOneOpr(loginSignupDbOpr.tableName,loginObj);
}

loginSignupDbOpr.validateUserLogin = function (loginObj){
    return loginSignupDbOpr.dbOpr.findOpr(loginSignupDbOpr.tableName,loginObj);
}

loginSignupDbOpr.verifyAccount = function (primaryId){
    return loginSignupDbOpr.dbOpr.findOpr(loginSignupDbOpr.tableName,{_id:primaryId},{$set:{unverified:false}});
}

module.exports=loginSignupDbOpr;

