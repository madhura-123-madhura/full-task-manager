const { baseTamplet } = require("./basedTemplet")

exports.forgetpasswordTemplet = ({ name, resetLink }) => {
    const content = `
    <h2>Request Password reset</h2>
    <p>Hi, ${name}</p>
    <p>you have request to reset password</p>
    <a href='${resetLink}''>Reset Password</a>
    <p>This Link will expires in 15 min</p>
    <p>If you have not request to reset password ,please ignore this link</p>
    `
    return baseTamplet({
        title: "",
        content
    })
}