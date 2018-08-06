const express = require('express')
const router = express.Router()
const user = require('./actions/user')
const api = require('./actions/api')
const system = require('./actions/system')
const property = require('./actions/property')
const collections = require('./actions/collections')
const json = require('./actions/json')

// 注册登陆
router.post('/register', user.register).post('/login', user.login)

// api相关
router
  .post('/addApi', api.add)
  .post('/getApi', api.get)
  .delete('/deleteApi', api.delete)
  .put('/putApi', api.put)

// 系统
router.post('/system', system.get)

// 属性相关
router
  .post('/addProperty', property.add)
  .post('/getProperties', property.get)
  .delete('/deleteProperty', property.delete)
  .put('/putProperty', property.put)

// 集合相关
router
  .post('/addCollections', collections.add)
  .post('/getCollections', collections.get)
  .delete('/deleteCollections', collections.delete)
  .put('/putCollections', collections.put)

// 生成json
router.get('/:user/:api/value', json.get)

module.exports = router
