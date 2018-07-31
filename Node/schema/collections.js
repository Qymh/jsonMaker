const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config/schema/collections').COLLECTIONSSCHEMACONFIG

const CollectionsSchema = new Schema({}, config.options)

module.exports = CollectionsSchema
