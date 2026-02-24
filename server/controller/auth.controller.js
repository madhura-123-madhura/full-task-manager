exports.signin = async (req, res) => {
    try {
        res.status(200).json({ message: "login success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to login" })

    }
}
exports.registerEmployee = async (req, res) => {
    try {
        res.status(200).json({ message: "register employee success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unabel to register employee" })

    }
}
exports.signout = async (req, res) => {
    try {
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