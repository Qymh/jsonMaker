const mongoose = require('mongoose')
const UserSchema = require('../schema/user')

const UserModel = mongoose.model('UserModel', UserSchema)

module.exports = UserModel
