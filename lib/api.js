function createApi(type){

  console.log('type'+type)
  const mongoose=require('mongoose')
  const db=mongoose.connect('mongodb://127.0.0.1:27017/qymh')
  const Schema=mongoose.Schema

  // 数据模式
  var ApiSchema=new Schema({})

  // 属性模式
  var PropertiesSchema=new Schema({
    property:Schema.Types.Mixed
  })

  // 数据模型
  var ApiModel
  // 属性模型
  var PropertiesModel

  // 当数据模型和属性模型存在时不进行覆盖
  try{
    ApiModel=mongoose.model('api'+type,ApiSchema)
    PropertiesModel=mongoose.model('properties'+type,PropertiesSchema)
  }catch(e){
    ApiModel=mongoose.model('api'+type)
    PropertiesModel=mongoose.model('properties'+type)
  }

  function Api(obj){
    for(var key in obj){
      this[key]=obj[key]
    }
  }

  function Property(obj){
    for(var key in obj){
      this[key]=obj[key]
    }
  }

  // 保存属性
  Property.save=(property,fn)=>{

    const PropertyEntity=new PropertiesModel({
      property
    })

    PropertyEntity.save(fn)
  }

  // 获取属性
  Property.getRange=(from,to,fn)=>{
    var range=PropertiesModel.find('property')
    range.skip(from)
    range.limit(to)
    range.exec((err,result)=>{
      if(err) return fn(err)
      fn(null,result)
    })
  }

  // 删除属性
  Property.delete=(property,fn)=>{
    PropertiesModel.findOneAndRemove({property:property},(err,result)=>{
      if(err) return fn(err)
        fn(null,result)
    })
  }

  // 保存值
  Api.save=function(datas,fn){

    var obj={}

    // 动态遍历向模式中添加新的属性
    for(var i=0;i<datas.length;i++){
      var property=datas[i].property
      obj[property]=datas[i].value
      ApiModel.schema.add({[property]:Schema.Types.Mixed})
    }

    setTimeout(()=>{
      let ApiEntity=new ApiModel(obj)
      ApiEntity.save(fn)
    })

  }

  // 获取值
  Api.getRange=(from,to,fn)=>{
    var range=ApiModel.find('*')
    range.skip(from)
    range.limit(to)
    range.sort({_id:-1})
    range.exec((err,result)=>{
      fn(null,result)
    })
  }

  // 修改值
  Api.put=(datas,fn)=>{
    var id=datas.id
    var innerkey=datas.key
    var innervalue=datas.value

    ApiModel.schema.add({[innerkey]:Schema.Types.Mixed})

    ApiModel.findByIdAndUpdate(id,{[innerkey]:innervalue},(err,result)=>{
      fn(null,result)
    })
  }

  // 删除值
  Api.delete=(id,fn)=>{
    ApiModel.findByIdAndRemove(id,(err,result)=>{
      fn(null,result)
    })
  }

  // 删除所有数据
  Api.deleteAll=(type,fn)=>{
    ApiModel.findOneAndRemove('*',(err,doc)=>{
    })
  }

  // 删除所有属性
  Property.deleteAll=(type,fn)=>{
    PropertiesModel.findOneAndRemove('*',(err,doc)=>{
    })
  }

  return{
    Api:Api,
    Property:Property
  }
}

module.exports=createApi