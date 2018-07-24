const express = require('express')
const router = express.Router()
const user = require('./actions/user')
const api = require('./actions/api')
const system = require('./actions/system')

router.post('/register', user.register).post('/login', user.login)

router.post('/addApi', api.add).post('/getApi', api.get)

router.post('/system', system.get)

module.exports = router
