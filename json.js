const http=require('http')
const express=require('express')
const bodyParser=require('body-parser')
const session=require('express-session')
const router=require('./config/router') // 路由管理
const message=require('./lib/message') // 信息提示中间件
const user=require('./lib/middleware/user') // 用户信息中间件

const app=express()

// 跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  next()
})

app.set('views',__dirname+'/views')
app.set('view engine','pug')

// 中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
  secret:'Qymh',
  cookie:{maxAge:60*60*24*30*1000}
}))
app.use(message)
app.use(user)
app.use('/',router)
app.use(express.static('./'))




http.createServer(app).listen(520)