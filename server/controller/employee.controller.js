// view task

const Task = require("../models/Task");
const User = require("../models/User");

exports.getAllTodos = async (req, res) => {
    try {

        const result = await Task.find({ employee: req.user })// req.user  -from auth.middleware.js protect function(id )
        res.status(200).json({ Message: "task view success", result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "unabel to view task" })
    }
}
exports.getProfile = async (req, res) => {
    try {
        const result = await User.findById(req.user).select("name email mobile role profilePic")
        // const result = await User.find({ role: "employee" }).select("-password")  it will send all data without password 
        res.status(200).json({ message: "get profile success", result })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to get profile" })
    }
}
//profile update for employee
exports.updateProfile = async (req, res) => {
    try {

        const { eid } = req.params
        const { name, email, mobile } = req.body
        const body = {}
        if (name) body.name = name
        if (email) body.email = email
        if (mobile) body.mobile = mobile
        // console.log(obj);

        await User.findByIdAndUpdate(req.user, body, { runValidators: true })
        res.status(200).json({ messsage: 'Profile updated success' })
    } catch (error) {
        console.log(error);
        res.status(401).json({ mesage: "unabel to update Profile" })
    }
}

//update complete/pending
exports.toggleTodoStatus = async (req, res) => {
    try {
        const { tid } = req.params
        const { complete } = req.body
        await Task.findByIdAndUpdate(tid, { complete, completeDate: new Date() }, { runValidators: true })
        res.status(200).json({ messsage: 'todo toggle updated success ' })
    } catch (error) {
        console.log(error);
        res.status(401).json({ mesage: "unabel to update " })
    }
}