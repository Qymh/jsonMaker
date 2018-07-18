const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../../config/schema/user').USERSCHEMACONFIG

const UserSchema = new Schema(
  {
    account: config.account,
    password: config.password,
    name: config.name,
    token: config.token
  },
  {
    versionKey: 'v1.0'
  }
)

const UserModel = mongoose.model('UserModel', UserSchema)

module.exports = UserModel
