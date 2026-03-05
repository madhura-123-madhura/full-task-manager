require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { adminProtected, protect } = require("./middlewares/auth.middleware.js")
const cors = require("cors")
const { FRONTEND_URL } = require("./utiles/config.js")

const app = express()

mongoose.connect(process.env.DB_ULR)


app.use(express.json())
app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(cookieParser())
app.use("/api/auth", require("./routes/auth.routes.js"))
app.use("/api/admin", protect("admin"), require("./routes/admin.routes.js"))
app.use("/api/emp", protect("employee"), require("./routes/employee.routes.js"))

app.use('/', (req, res) => {
    res.status(404).json({ message: `resource not found ${req.method} ${req.path}` })
})

mongoose.connection.once("open", () => {
    console.log("db connected..");
    app.listen(process.env.PORT, () => {
        console.log("server running..");
        console.log(`mode:${process.env.NODE_ENV}`);
        console.log(`CORS ALLOWED:${FRONTEND_URL}`);


    })

})

module.exports = app