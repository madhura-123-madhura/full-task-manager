const { signin, registerEmployee, signout, sendOtp, verifyOTP, forgetPassword, changePassword } = require("../controller/auth.controller")
const { adminProtected } = require("../middlewares/auth.middleware")

const router = require("express").Router()

router
    .post("/signin", signin)
    .post("/register-employee", adminProtected, registerEmployee)
    .post("/signout", signout)
    .post("/send-otp", sendOtp)
    .post("/verify-otp", verifyOTP)
    .post("/forget-password", forgetPassword)
    .post("/change-password", changePassword)


module.exports = router