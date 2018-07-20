const express = require('express')
const router = express.Router()
const user = require('./actions/user')
const api = require('./actions/api')

router.post('/register', user.register).post('/login', user.login)

router.post('/addApi', api.add).post('/getApi', api.get)

module.exports = router
