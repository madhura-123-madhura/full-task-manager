const User = require("../models/User")
const { PRODUCTION } = require("../utiles/config")
const jwt = require("jsonwebtoken")
exports.adminProtected = async (req, res, next) => {
    try {
        // check for cookie
        const TOKEN = req.cookies.TOKEN//cookie name from auth.controller
        //     our variable
        if (!TOKEN) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "unabel to authenticate"
                    : "NO COOKIE FOUND"
            })
        }
        // validate token
        jwt.verify(TOKEN, process.env.JWT_KEY, async (err, decode) => {// decode cotain
            if (err) {
                returnres.status(401).json({ message: "ivalid toke" })
            }
            const result = await User.findById(decode._id)
            if (!result) {
                return res.status(401).json({ message: "invalid Id" })
            }
            if (result.role !== "admin") {
                return res.status(403).json({ message: "not authorized to access this route" })
            }

            req.user = decode._id// from signin(auth.controller.js)
            next()
        })
        // validate is admin
    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "unabel to authenticate" })
    }
}


exports.protect = (role) => async (req, res, next) => {
    try {
        // check for cookie
        const TOKEN = req.cookies.TOKEN//cookie name from auth.controller
        //     our variable
        if (!TOKEN) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "unabel to authenticate"
                    : "NO COOKIE FOUND"
            })
        }
        // validate token
        jwt.verify(TOKEN, process.env.JWT_KEY, async (err, decode) => {// decode cotain
            if (err) {
                returnres.status(401).json({ message: "ivalid toke" })
            }
            const result = await User.findById(decode._id)
            if (!result) {
                return res.status(401).json({ message: "invalid Id" })
            }
            if (result.role !== role) {
                return res.status(403).json({ message: "not authorized to access this route" })
            }

            req.user = decode._id// from signin(auth.controller.js)
            next()
        })
        // validate is admin
    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "unabel to authenticate" })
    }
}