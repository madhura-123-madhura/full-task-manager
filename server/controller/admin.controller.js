const Task = require("../models/Task");
const User = require("../models/User");

exports.getAllEmployees = async (req, res) => {
    try {
        const result = await User.find({ role: "employee" }).select("name email mobile role active isDelete")
        // const result = await User.find({ role: "employee" }).select("-password")  it will send all data without password 
        res.status(200).json({ message: "employee get success", result })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to fetch data" })
    }
}
exports.UpdateEmployees = async (req, res) => {
    try {

        const { eid } = req.params
        let obj = {}
        const { name, email, mobile } = req.body
        if (name) {
            obj = { ...obj, name: name }
        }
        if (email) {
            obj = { ...obj, email: email }
        }
        if (mobile) {
            obj = { ...obj, mobile: mobile }
        }
        if (obj.name || obj.email || obj.mobile) {
            await User.findByIdAndUpdate(eid, obj, { runValidators: true })
        }
        res.status(200).json({ message: "employee update success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to update data" })
    }
}
exports.toggletEmployeestatus = async (req, res) => {
    try {
        const { status } = req.body
        if (typeof status !== "boolean") {
            return res.status(401).json({ message: "status is required" })
        }
        const { eid } = req.params
        await User.findByIdAndUpdate(eid, { active: status }, { runValidators: true })
        res.status(200).json({ message: "employee activate success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to activet data" })
    }
}
exports.deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.params
        await User.findByIdAndUpdate(eid, { isDelete: true }, { runValidators: true })
        res.status(200).json({ message: "employee delete success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to delete data" })
    }
}
exports.restoreEmployee = async (req, res) => {
    try {
        const { eid } = req.params
        await User.findByIdAndUpdate(eid, { isDelete: false }, { runValidators: true })
        res.status(200).json({ message: "employee restore success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to restore data" })
    }
}
exports.permanuntDeleteEmployee = async (req, res) => {
    try {
        const { eid } = req.params
        await User.findByIdAndDelete(eid)
        res.status(200).json({ message: "employee delete permenently success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to delete permenently data" })
    }
}

// crud for task

exports.createTask = async (req, res) => {
    try {
        const { task, desc, priority, employee, due } = req.body
        if (!task || !desc || !priority || !employee || !due) {
            res.status(400).json({ message: "all fields required" })
        }
        await Task.create({ task, desc, priority, employee, due })
        res.status(200).json({ message: "task create success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to create task" })
    }
}
exports.readTask = async (req, res) => {
    try {
        const result = await Task.find()
        res.status(200).json({ message: "task read success", result })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to read task" })
    }
}
exports.updateTask = async (req, res) => {
    try {
        const { tid } = req.params
        const { task, desc, priority, employee, due } = req.body
        const obj = {}
        if (task) obj.task = task
        if (desc) obj.desc = desc
        if (priority) obj.priority = priority
        if (employee) obj.employee = employee
        if (due) obj.due = due
        await Task.findByIdAndUpdate(tid, obj, { runValidators: true })
        res.status(200).json({ message: "task update success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to update task" })
    }
}
exports.deleteTask = async (req, res) => {
    try {
        const { tid } = req.params
        await Task.findByIdAndDelete(tid)
        res.status(200).json({ message: "task delete success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to delete task" })
    }
}

//view task
//profile update
//mark coplete/pending