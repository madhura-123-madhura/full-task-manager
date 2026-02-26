const nodeMailer = require("nodemailer")

exports.sendEmail = ({ email, subject, message }) => new Promise((resolve, reject) => {
    try {
        const transport = nodeMailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
        })
        transport.sendMail({
            to: email,
            subject,
            html: message
        })
        console.log("email send success");
        resolve("email send success")
    } catch (error) {
        console.log(error);
        reject("unabel to send email")

    }
})