const crypto = require("crypto")
const pass = crypto.randomBytes(8).toString("hex")
console.log(pass);
