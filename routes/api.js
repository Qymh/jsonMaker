var Api
var Property

// 页面
exports.list=(req,res,next)=>{
  var params=req.params
  var name=params.name

  res.render('api.pug',{
    name:name,
    res:res
  })

  exports.name=name

  Api=require('../lib/api')

  let inner=Api(name)

  Api=inner.Api
  Property=inner.Property

}

// 获取所有属性
exports.getProperty=(req,res,next)=>{
  Property.getRange(0,100,(err,result)=>{
    res.json(result)
  })
}

// post提交属性
exports.postProperty=(req,res,next)=>{
  var datas=req.body
  var property=datas.property

  Property.save(property,()=>{
  })

  res.json(datas)
}

//delete删除属性
exports.deleteProperty=(req,res,next)=>{
  var datas=req.query
  var property=datas.property

  Property.delete(property,(err,result)=>{
    if(err) return next(err)
    res.json(result)
  })
}

// 获取值
exports.getValue=(req,res,next)=>{

  var params=req.params
  var name=params.name

  
  let ApiFn=require('../lib/api')
  
  let inner=ApiFn(name)

  let Api=inner.Api


  Api.getRange(0,100,(err,result)=>{
    res.json(result)
  })
}

// post提交值
exports.postValue=(req,res,next)=>{
  var datas=req.body
  var obj={}

  Api.save(datas,(err,doc)=>{
    obj._id=doc._id
    
    for(let i=0;i<datas.length;i++){
      obj[datas[i]['property']]=datas[i]['value']
    }
    obj._v=0

    res.json(obj)

  })

}

// put修改值
exports.putValue=(req,res,next)=>{
  var datas=req.body
  
  Api.put(datas,()=>{

  })

  res.json(datas)
}

// delete删除值
exports.deleteValue=(req,res,next)=>{
  let datas=req.query
  let id=datas.id

  Api.delete(id,()=>{

  })

  res.json(datas)
}