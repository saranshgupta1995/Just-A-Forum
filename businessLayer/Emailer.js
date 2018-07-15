let emailer = {};

var nodemailer = require('nodemailer');
emailer.smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "saranshgupta1995@gmail.com",
        pass: "gHsnaras184_l"
    }
});

emailer.mailOptions = {
    from: 'saranshgupta1995@gmail.com'
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