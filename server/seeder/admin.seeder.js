// use seed when you eant to add seprate information in the data base with nue table

require("dotenv").config({ path: "./../.env" })
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const User = require("../models/User");


exports.seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ULR)
        console.log("db connected");
        const result = await User.findOne({ role: "admin" })
        if (result) {
            console.log("admin already present");
            process.exit(1)

        }
        const hash = await bcrypt.hash("123", 10)

        await User.create({
            name: "admin",
            email: "admin@gmail.com",
            password: hash,
            mobile: "9822630150",
            role: "admin"
        })
        console.log("admin seed complete");
        process.exit(1)

    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}