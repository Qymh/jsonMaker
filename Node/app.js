const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const router = require('./router')

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

mongoose.connect('mongodb://localhost/test')
db.once('open', () => {
  console.log('ready')
})

app.use(bodyParser.json())
app.use('/api', router)

app.listen(5766)
