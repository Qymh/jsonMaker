const User=require('../lib/user')

exports.list=function(req,res,next){
  res.render('register',{
    res:res
  })
}

exports.post=function(req,res,next){
  var datas=req.body

  var user=new User(datas)

  User.getByName(user.name,function(err,doc){

    if(err) return next(err)
    if(doc.id){
      res.error('此用户名已经存在')
      res.redirect('back')
    }else{
      user.save(function(){
        
      })
    
      res.redirect('/login')
    }
  })

}

