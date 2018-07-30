const mongoose = require('mongoose')
const PropertySchema = require('../schema/property')

const PropertyModel = mongoose.model('PropertySchema', PropertySchema)

module.exports = PropertyModel
