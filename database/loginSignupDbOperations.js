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

module.exports=loginSignupDbOpr;

