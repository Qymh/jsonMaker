var User=require('../user')

module.exports=function(req,res,next){
  var uid=req.session.uid
  if(!uid) return next()
  User.getById(uid,function(err,user){
    if(err) return next(err)
    res.locals.user=user
    next()
  })
}