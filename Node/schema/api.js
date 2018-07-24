const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config/schema/api').APISCHEMACONFIG

const ApiSchema = new Schema(
  {
    apiName: config.apiName,
    description: config.description,
    userId: config.userId
  },
  config.options
)

const ApiModel = mongoose.model('ApiModel', ApiSchema)

module.exports = ApiModel
