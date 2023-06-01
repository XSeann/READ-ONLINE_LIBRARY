const express = require('express')

// controller functions
const { getUsers } = require('../controller/userController')

const router = express.Router()

// get all users
router.get('/users', getUsers)

module.exports = router