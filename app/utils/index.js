const nodemailer = require('nodemailer');
require('dotenv').config();


const USERNAME = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASSWORD;

exports.sendMail = async function (recipients, subject, text) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: USERNAME, // generated ethereal user
            pass: PASSWORD // generated ethereal password
        }
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: '"Holla" <benidevoo@gmail.com>', // sender address
        to: recipients, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: `<b>${text}</b>` // html body
    });
    return 'message sent';
};

