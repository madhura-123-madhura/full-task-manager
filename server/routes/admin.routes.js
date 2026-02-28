const { getAllEmployees, UpdateEmployees, toggletEmployeestatus, deleteEmployee, createTask, readTask, updateTask, deleteTask, restoreEmployee, permanuntDeleteEmployee } = require("../controller/admin.controller")


const router = require("express").Router()

router
    .get("/employee", getAllEmployees)
    .put("/update-employee/:eid", UpdateEmployees)
    .put("/toggle-employee-status/:eid", toggletEmployeestatus)
    .delete("/delete-employee/:eid", deleteEmployee)
    .put("/restore-employee/:eid", restoreEmployee)
    .delete("/remove-employee/:eid", permanuntDeleteEmployee)

    .post("/todo-create", createTask)
    .get("/todo", readTask)
    .put("/todo/:tid", updateTask)
    .delete("/todo/:tid", deleteTask)



module.exports = router