const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config/schema/property').PROPERTYSCHEMACONFIG

const PropertySchema = new Schema(
  {
    name: config.name,
    type: config.type
  },
  config.options
)

module.exports = PropertySchema
