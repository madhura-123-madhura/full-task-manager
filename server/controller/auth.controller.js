const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { PRODUCTION, FRONTEND_URL } = require("../utiles/config")
const crypto = require("crypto")
const { sendEmail } = require("../utiles/email")
const { registerTemplet } = require("../email-templets/registerTemplet")
const { otpTemplet } = require("../email-templets/oypTemplet")

const { differenceInSeconds } = require("date-fns")
const { forgetpasswordTemplet } = require("../email-templets/forgetPasswordTemplet")
const { error } = require("console")
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
        const { username } = req.body
        if (!username) {
            return res.status(400).json({ message: "email/mobile is required" })
        }
        const result = await User.findOne({ $or: [{ email: username }, { mobile: username }] })
        if (!result) {
            return res.status(400).json({ message: "email/mobile not registerd with us " })
        }
        //create otp
        const otp = crypto.randomInt(100000, 1000000)
        const hashOTP = await bcrypt.hash(String(otp), 10)//String() is used to convert number into string
        //add to database
        await User.findByIdAndUpdate(result._id, { otp: hashOTP, otpSendOn: new Date() })
        //send otp in email/sms/whatsapp
        await sendEmail({
            email: result.email,
            subject: "Login OTP",
            message: otpTemplet({
                name: result.name,
                otp,
                sec: process.env.OTP_EXPIRY,
                min: process.env.OTP_EXPIRY / 60

            })
        })
        res.status(200).json({ message: "sendOtp success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to send otp" })

    }
}
exports.verifyOTP = async (req, res) => {
    try {
        const { username, otp } = req.body
        if (!username || !otp) {
            return res.status(400).json({ message: "all fields required" })
        }
        const result = await User.findOne({ $or: [{ email: username }, { mobile: username }] })
        if (!result) {
            return res.status(400).json({ message: " email/moile not registerd with us" })
        }
        const verify = await bcrypt.compare(otp, String(result.otp))
        if (!verify) {
            return res.status(400).json({ message: "invalid OTP" })
        }
        if (differenceInSeconds(new Date(), new Date(result.otpSendOn)) > process.env.OTP_EXPIRY) {
            await User.findByIdAndUpdate(result._id, { otp: null })
            return res.status(400).json({ message: " otp expires" })
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
        res.status(500).json({ message: "unabel to verify OTP " })

    }
}
exports.forgetPassword = async (req, res) => {
    try {
        const { username } = req.body
        if (!username) {
            return res.status(400).json({ message: "email/mobile is required" })
        }
        const result = await User.findOne({ $or: [{ email: username }, { mobile: username }] })
        if (!result) {
            return res.status(400).json({ message: "email/moile not registerd with us " })
        }
        const accessToken = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "15m" })
        await User.findByIdAndUpdate(result._id, { accessToken })
        const link = `${FRONTEND_URL}/forget-password/?token=${accessToken}`
        await sendEmail({
            email: result.email,
            subject: "Request for change Password",
            message: forgetpasswordTemplet({ name: result.name, resetLink: link })
        })

        res.status(200).json({ message: "forgetPassword success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to forgetPassword " })

    }
}
exports.changePassword = async (req, res) => {
    try {
        const { token } = req.query
        const { password } = req.body
        if (!token) {
            return res.status(400).json({ message: "token required" })
        }
        const result = await User.findOne({ accessToken: token })
        if (!result) {
            return res.status(400).json({ message: "token not found" })
        }
        jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
            if (err) {
                console.log(err);
                await User.findByIdAndUpdate(result._id, { accessToken: null })
                return res.status(400).json({ message: "invalid token" })
            }
            const hash = bcrypt.hash(password, 10)
            await User.findByIdAndUpdate(result._id, { password: hash })
            res.status(200).json({ message: "changePassword success" })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to changePassword " })

    }
}