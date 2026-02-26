const { baseTamplet } = require("./basedTemplet")

exports.registerTemplet = ({ name, password }) => {
    const content = `
    <h2>welcom to SKILLHUB</h2>
    <p>Hi, ${name}</p>
    <div>Your temporary Password is <h1>${password}</h1></div>
    <p>Thank you for choosing SKILLHUB</p>
    `
    return baseTamplet({
        title: "welcome to SKILLHUB",
        content
    })
}