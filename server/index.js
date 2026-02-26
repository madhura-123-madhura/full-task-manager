require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()

mongoose.connect(process.env.MONGO_ULR)


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", require("./routes/auth.routes.js"))

app.use('/', (req, res) => {
    res.status(200).json({ message: `task manager api running in ${process.env.NODE_ENV} mode` })
})

mongoose.connection.once("open", () => {
    console.log("db connected..");
    app.listen(process.env.PORT, () => {
        console.log("server running..");
        console.log(`mode:${process.env.NODE_ENV}`);


    })

})

module.exports = app