// 公共错误返回
exports.responseError = (res, err) => {
  let data = err
  res.json(data)
}
