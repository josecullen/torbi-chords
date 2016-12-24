'use strict'
let Song = require('./songs.model')

let create = (req, res, next) => {
    console.log('creating', req.body)
    let song = new Song(req.body)

    song.save((err, song) => {
        if (err) {
            return next(err)
        }
        req.song = song
        next()
    })
}

let retrieveAll = (req, res, next) => {
    Song.find({}, (err, songs) => {
        if(err !== null){
            next(err)
        }
        req.songs = songs
        next()
    })
}

let retrieve = (req, res, next) => {
    Song.findById(req.params.songId, (err, song) => {
        if(err !== null){
            next(err)
        }
        req.song = song
        next()
    })
}

let update = (req, res, next) => {
    Song.update(
        {_id: req.params.songId}, 
        req.body, 
        (err, result) => {
        if(err !== null){
            next(err)
        }
        req.result = result
        next()
    })
}

let deleteSong = (req, res, next) => {
    Song.remove(
        {_id: req.params.songId}, 
        (err, result ) => {
        if(err !== null){
            next(err)
        }
        req.result = result
        next()
    })
}

module.exports = {
    create      : create,
    retrieve    : retrieve,
    retrieveAll : retrieveAll,
    update      : update,
    delete      : deleteSong
}