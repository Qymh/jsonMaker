exports.generateAddApi = obj => {
  const { apiName, createdAt, description } = obj
  // let computedCreatedAt = ''
  const year = createdAt.getYear()

  console.log(year)
  return {
    apiName,
    createdAt,
    description
  }
}

exports.generateGetApi = arr => {
  let laterArr = []
  // 重新构造时间
  for (const obj of arr) {
    const { apiName, createdAt, description } = obj
    let computedCreatedAt = ''
    const year = createdAt.getFullYear()
    const month = createdAt.getMonth() + 1
    const day = createdAt.getDate()
    const hour = createdAt.getHours()
    const minute = createdAt.getMinutes()
    const second = createdAt.getSeconds()
    computedCreatedAt = `${year}年${month}月${day}日${hour}点${minute}分${second}秒`
    laterArr.push({
      apiName,
      createdAt: computedCreatedAt,
      description
    })
  }
  return laterArr
}
