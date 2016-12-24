'use strict'
let mongoose = require('mongoose')

let song = mongoose.Schema({
    "title"         : String,
    "description"   : String,
    "author"        : String,
    "raw"           : String
})

module.exports = mongoose.model('Song', song)
