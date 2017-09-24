const Home=require('../lib/home')
const Api=require('../lib/api')().Api

// 加载首页页面
exports.list=(req,res,next)=>{
  res.render('home.pug',{
    res:res
  })
  Api.deleteAll('test',(err,result)=>{
    console.log(result)
  })
}

// 获取api
exports.get=(req,res,next)=>{
  Home.getRange(0,100,(err,result)=>{
    res.json(result)
  })
}

// 提交api
exports.post=(req,res,next)=>{
  let datas=req.body
  let inner={
    api:datas.api,
    apiDetails:datas.apiDetails,
    time:datas.time
  }

  Home.save(inner,(err,result)=>{
    let inner={
      _id:result._id,
      api:result.api,
      apiDetails:result.apiDetails,
      time:result.time,
      __v:result.__v
    }
    res.json(inner)
  })

}

// 删除api
exports.delete=(req,res,next)=>{
  let datas=req.query
  let id=datas.id
  let type=datas.type

  Home.delete(id,type,()=>{

  })

  res.json(datas)
}