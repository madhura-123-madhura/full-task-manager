const { signin, registerEmployee, sendOtp, verifyOTP, forgetPassword, changePassword, signoutEmployee, signoutAdmin } = require("../controller/auth.controller")
const { adminProtected, protect } = require("../middlewares/auth.middleware")

const router = require("express").Router()

router
    .post("/signin", signin)
    .post("/register-employee", adminProtected, registerEmployee)
    .post("/signout-employee", protect("employee"), signoutEmployee)
    .post("/signout-admin", protect("admin"), signoutAdmin)
    .post("/send-otp", sendOtp)
    .post("/verify-otp", verifyOTP)
    .post("/forget-password", forgetPassword)
    .post("/change-password", changePassword)


module.exports = router