const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PropertySchema = require('./property')
const CollectionsSchema = require('./collections')
const config = require('../config/schema/api').APISCHEMACONFIG

const ApiSchema = new Schema(
  {
    apiName: config.apiName,
    description: config.description,
    properties: [PropertySchema],
    collections: [CollectionsSchema]
  },
  config.options
)

module.exports = ApiSchema
