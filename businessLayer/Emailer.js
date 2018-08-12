let emailer = {};

var nodemailer = require('nodemailer');
emailer.smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "desocializeapp@gmail.com",
        pass: process.env.email_password
    }
});

emailer.mailOptions = {
    from: 'desocializeapp@gmail.com'
};

emailer.sendMail=function(){
    emailer.smtpTrans.sendMail(emailer.mailOptions, function(err){
        if(!err){
            console.log('email has been sent')
        }else {
            throw err;
        }
    })

}

module.exports = emailer;