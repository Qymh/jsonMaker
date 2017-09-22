const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const db=mongoose.connect('mongodb://127.0.0.1:27017/qymh')
const Schema=mongoose.Schema

// 用户模式
const UserSchema=new Schema({
  name:Schema.Types.Mixed,
  salt:Schema.Types.Mixed,
  pass:Schema.Types.Mixed
})

// 用户模型
const UserModel=mongoose.model('user',UserSchema)

function User(obj){
  for(let key in obj){
    this[key]=obj[key]
  }
}

module.exports=User

// 密码加盐
User.prototype.hashPass=function(fn){
  const user=this
  bcrypt.genSalt(12,function(err,salt){
    if(err) return fn(err)
    user.salt=salt
    bcrypt.hash(user.pass,salt,function(err,hash){
      if(err) return fn(err)
      user.pass=hash
      fn()
    })
  })
}


// 创建账户
User.prototype.create=function(fn){
  const user=this

  const UserEntity=new UserModel({
    name:user.name,
    salt:user.salt,
    pass:user.pass
  })

  UserEntity.save()
}

// 储存用户
User.prototype.save=function(fn){
  if(this.id){
  }else{
    const user=this
    user.hashPass(function(err){
      if(err) return fn(err)
      user.create(fn)
    })
  }
}

// 登陆
User.login=function(name,pass,fn){
  User.getByName(name,function(err,user){
    if(err) return fn(err)
    if(!user.id) return fn() // 用户不存在
    bcrypt.hash(pass,user.salt,function(err,hash){
      if(err) return fn(err)
      if(hash==user.pass) return fn(null,user) // 登陆成功
      fn() // 登陆失败
    })
  })
}

// 通过名字获取用户
User.getByName=function(name,fn){
  UserModel.findOne({name:name},(err,doc)=>{
    if(err) return fn(err)
    fn(null,new User(doc))
  })
}

// 通过id获取用户
User.getById=function(id,fn){
  UserModel.findById(id,(err,doc)=>{
    if(err) return fn(err)
    fn(null,new User(doc))
  })
}
