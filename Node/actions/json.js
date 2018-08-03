const json = require('../lib/json')

// 获取
exports.get = async (req, res) => {
  const url = req.url
  await json
    .get(url)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}
