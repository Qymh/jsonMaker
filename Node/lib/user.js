const UserModel = require('../schema/user')

exports.register = (account, password) => {
  return new Promise((resolve, reject) => {
    let User = new UserModel({
      account,
      password
    })

    User.save((err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
