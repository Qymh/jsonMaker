const mongoose = require('mongoose')
const CollectionsSchema = require('../schema/collections')

const CollectionsModel = mongoose.model('CollectionsModel', CollectionsSchema)

module.exports = CollectionsModel
