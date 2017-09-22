const User=require('../lib/user')

exports.list=function(req,res,next){
  res.render('login.pug',{
    title:'测试',
    res:res
  })
}

exports.post=function(req,res,next){
  var datas=req.body

  var user=new User(datas)

  // 验证用户
  User.login(user.name,user.pass,function(err,user){
    if(!user){
      res.error('用户名或密码错误!')
      res.redirect('back')
    }else{  
      req.session.messages=[] // 清除验证
      req.session.uid=user.id // 保留用户id
      res.redirect('/')
    }
  })
}