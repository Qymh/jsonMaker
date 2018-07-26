const mongoose = require('mongoose')
const ApiSchema = require('../schema/api')

const ApiModel = mongoose.model('ApiModel', ApiSchema)

module.exports = ApiModel
