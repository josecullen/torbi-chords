'use strict'
let mongoose = require('mongoose')
var Schema = mongoose.Schema
let book = mongoose.Schema({
    "title"         : String,
    "description"   : String,
    "songs"        : [{type: Schema.Types.ObjectId, ref: 'Song'}],
    "author"           : String
})

module.exports = mongoose.model('Book', book)
