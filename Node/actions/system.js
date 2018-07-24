const system = require('../lib/system')

exports.get = async (req, res) => {
  const data = req.body
  const { token } = data
  await system.get(token).then(doc => {
    res.json(doc)
  })
}
