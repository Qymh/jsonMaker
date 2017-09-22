const mongoose=require('mongoose')
const db=mongoose.connect('mongodb://127.0.0.1:27017/qymh')
const Schema=mongoose.Schema

const HomeSchema=new Schema({
  api:Schema.Types.Mixed,
  time:Schema.Types.Mixed
})

const HomeModel=mongoose.model('home',HomeSchema)

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
Home.delete=(id,fn)=>{
  HomeModel.findByIdAndRemove(id,fn)
}

module.exports=Home