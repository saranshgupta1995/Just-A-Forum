let emailer = {};

var nodemailer = require('nodemailer');
emailer.smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "desocializeapp@gmail.com",
        pass: "hsnaras184"
    }
});

emailer.mailOptions = {
    from: 'desocializeapp@gmail.com'
};

emailer.sendMail=function(){
    console.log('trying email')
    emailer.smtpTrans.sendMail(emailer.mailOptions, function(err){
        console.log('in email func')
        if(!err){
            console.log('email has been sent')
        }else {
            throw err;
        }
    })

}

module.exports = emailer;