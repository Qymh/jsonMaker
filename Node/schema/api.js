const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config/schema/api').APISCHEMACONFIG

const ApiSchema = new Schema(
  {
    apiName: config.apiName,
    description: config.description
  },
  config.options
)

module.exports = ApiSchema
