const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ApiSchema = require('./api')
const config = require('../config/schema/user').USERSCHEMACONFIG

const UserSchema = new Schema(
  {
    account: config.account,
    password: config.password,
    userName: config.userName,
    token: config.token,
    api: [ApiSchema]
  },
  config.options
)

module.exports = UserSchema
