const { getAllTodos, updateProfile, toggleTodoStatus, getProfile } = require("../controller/employee.controller")

const router = require("express").Router()

router
    .get("/todos", getAllTodos)
    .get("/get-employee", getProfile)
    .put("/profile-update", updateProfile)
    .put("/todo-update/:tid", toggleTodoStatus)

module.exports = router