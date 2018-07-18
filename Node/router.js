const express = require('express')
const router = express.Router()
const user = require('./actions/user')

router.post('/register', user.register).post('/login', user.login)

module.exports = router
