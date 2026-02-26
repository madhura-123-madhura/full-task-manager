const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { PRODUCTION } = require("../utiles/config")
const crypto = require("crypto")
const { sendEmail } = require("../utiles/email")
const { registerTemplet } = require("../email-templets/registerTemplet")
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "email or password are required" })
        }
        const result = await User.findOne({ email }) //we got the keys from the data base
        if (!result) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION  //PRODUCTION="production"
                    ? "Invalid credential"
                    : "Email not found"

            })
        }
        if (!result.active) {
            return res.status(401).json({ message: "account blocked by admin" })
        }
        const verify = await bcrypt.compare(password, result.password)
        if (!verify) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "Invalid credential"
                    : "Invalid password"

            })
        }
        const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
        res.cookie("TOKEN", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === PRODUCTION,
            maxAge: 1000 * 60 * 60 * 24
        })
        res.status(200).json({
            message: "login success", result: {
                name: result.name,
                email: result.email,
                mobile: result.mobile,
                profilePic: result.profilePic,
                _id: result._id,
                role: result.role
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to login" })

    }
}
exports.registerEmployee = async (req, res) => {
    try {
        // only admin can register employee
        const { name, email, mobile } = req.body
        if (!name || !email || !mobile) {
            return res.status(400).json({ message: "all field required" })
        }
        const isFound = await User.findOne({ $or: [{ email }, { mobile }] })
        if (isFound) {
            return res.status(401).json({ message: "email/mobile already exist" })
        }
        const pass = crypto.randomBytes(8).toString("hex")
        const password = await bcrypt.hash(pass, 10)
        //send email
        await sendEmail({
            email,
            subject: "Welcome to task manager",
            message: registerTemplet({ name, password: pass })
        })
        await User.create({ name, email, mobile, password, role: "employee" })
        res.status(200).json({ message: "register employee success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to register employee" })

    }
}
exports.signout = async (req, res) => {
    try {
        res.clearCookie("TOKEN")
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to logout employee" })

    }
}
exports.sendOtp = async (req, res) => {
    try {
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to logout employee" })

    }
}
exports.verifyOTP = async (req, res) => {
    try {
        res.status(200).json({ message: "verify OTP success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to verify OTP " })

    }
}
exports.forgetPassword = async (req, res) => {
    try {
        res.status(200).json({ message: "forgetPassword success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to forgetPassword " })

    }
}
exports.changePassword = async (req, res) => {
    try {
        res.status(200).json({ message: "changePassword success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to changePassword " })

    }
}