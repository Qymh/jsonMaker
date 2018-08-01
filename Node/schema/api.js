const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PropertySchema = require('./property')
const config = require('../config/schema/api').APISCHEMACONFIG

const ApiSchema = new Schema(
  {
    apiName: config.apiName,
    description: config.description,
    properties: [PropertySchema],
    collections: [Schema.Types.Mixed]
  },
  config.options
)

module.exports = ApiSchema
