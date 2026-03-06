const { getAllTodos, updateProfile, toggleTodoStatus, getProfile } = require("../controller/employee.controller")

const router = require("express").Router()

router
    .get("/todos", getAllTodos)
    .get("/profile", getProfile)
    .put("/profile-update", updateProfile)
    .put("/todo-update/:tid", toggleTodoStatus)

module.exports = router

