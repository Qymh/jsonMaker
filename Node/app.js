const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const authenticate = require('./middleware/authenticate')
const db = mongoose.connection
const router = require('./router')

app.all('*', function(req, res, next) {
  if (
    req.headers.origin === 'https://ui.qymh.org.cn' ||
    req.headers.origin === 'https://json.qymh.org.cn' ||
    req.headers.origin === 'http://127.0.0.1:8080'
  ) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS'
    )
    res.header('Access-Control-Allow-Headers', '*')
  }
  next()
})

mongoose.connect('mongodb://localhost/Qymh')
db.once('open', () => {
  console.log('ready')
})

app.post('*', authenticate.authenticate)
app.put('*', authenticate.authenticate)
app.delete('*', authenticate.authenticate)
app.use(bodyParser.json())
app.use(
  session({
    secret: 'Qymh',
    cookie: {
      maxAge: 3600 * 24 * 7
    }
  })
)
app.use('/api', router)

app.listen(5766)
