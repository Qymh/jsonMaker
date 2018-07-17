const express = require('express')
const router = express.Router()
const user = require('./actions/user')

router.post('/register', user.register)

module.exports = router
