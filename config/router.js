const express=require('express')
const router=express.Router()
const login=require('../routes/login') // 登陆
const register=require('../routes/register') // 注册
const api=require('../routes/api') // api
const home=require('../routes/home')// home

module.exports=router

router.get('/',home.list)
      .get('/api',home.get)
      .post('/api',home.post)
      .delete('/api',home.delete)

      // 登陆
      .get('/login',login.list)
      .post('/login',login.post)

      // 注册
      .get('/register',register.list)
      .post('/register',register.post)

      // 属性
      .get('/api/:name',api.list)
      .get('/api/:name/property',api.getProperty)
      .post('/api/:name/property',api.postProperty)
      .delete('/api/:name/property',api.deleteProperty)

      // 数据
      .get('/api/:name/value',api.getValue)
      .post('/api/:name/value',api.postValue)
      .put('/api/:name/value',api.putValue)
      .delete('/api/:name/value',api.deleteValue)