const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
})

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from : 'wfsnem52@gmail.com',
        to,
        subject,
        text
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        } else{
            console.log('Email sent: ' + info.response);
        }
    })
}

const sendMailHTML = (to, subject, html) => {
    const mailOptions = {
        from : 'wfsnem52@gmail.com',
        to,
        subject,
        html
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        } else{
            console.log('Email sent: ' + info.response);
        }
    })
}



module.exports = {
    sendMail,
    sendMailHTML
};
