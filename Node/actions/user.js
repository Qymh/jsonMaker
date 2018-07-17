const user = require('../lib/user')

exports.register = async (req, res, next) => {
  let data = req.body
  let { account, password } = data
  // let cal = await user.register(account, password)

  console.log(account, password)

  res.json('123')
}
