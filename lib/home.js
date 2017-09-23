var mongoose=require('mongoose')
var db=mongoose.connect('mongodb://127.0.0.1:27017/qymh')
var Schema=mongoose.Schema

// api模式
var HomeSchema=new Schema({
  api:Schema.Types.Mixed,
  time:Schema.Types.Mixed
})

// api模型
var HomeModel=mongoose.model('home',HomeSchema)

function Home(obj){
  for(let key in obj){
    this[key]=obj[key]
  }
}

// 获取数据
Home.getRange=(from,to,fn)=>{
  let range=HomeModel.find('*')
  range.skip(from)
  range.limit(to)
  range.exec((err,result)=>{
    fn(null,result)
  })
}

// 储存数据
Home.save=(datas,fn)=>{
  let HomeEntity=new HomeModel(datas)
  
  HomeEntity.save(fn)
}

// 删除数据
Home.delete=(id,type,fn)=>{
  let inner=require('../lib/api')(type)
  let Api=inner.Api
  let Property=inner.Property
  Api.deleteAll()
  Property.deleteAll()
  HomeModel.findByIdAndRemove(id,fn)
}

module.exports=Home