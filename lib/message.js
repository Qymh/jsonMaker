const express=require('express')
const res=express.response

res.message=function(msg){
  let session=this.req.session
  session.messages=session.message||[]
  session.messages.push({
    msg:msg
  })
}

res.error=function(msg){
  return this.message(msg)
}

module.exports=function(req,res,next){
  res.locals.messages=req.session.messages

  res.locals.removeMessages=function(){
    req.session.messages=[]
  }
  next()
}