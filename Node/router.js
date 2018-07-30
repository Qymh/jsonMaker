const express = require('express')
const router = express.Router()
const user = require('./actions/user')
const api = require('./actions/api')
const system = require('./actions/system')
const property = require('./actions/property')

router.post('/register', user.register).post('/login', user.login)

router
  .post('/addApi', api.add)
  .post('/getApi', api.get)
  .delete('/deleteApi', api.delete)

router.post('/system', system.get)

router.post('/addProperty', property.add).post('/getProperties', property.get)

module.exports = router
