'use strict'
let Book = require('./book.model')

let create = (req, res, next) => {
    console.log('creating', req.body)
    // if(req.body.songs && req.body.songs[0]._id !== undefined){
    //     req.body.songs = req.body.songs.map(song => song._id)
    // }
    console.log('parsed', req.body)
    let book = new Book(req.body)

    book.save((err, book) => {
        if (err) {
            return next(err)
        }
        req.book = book
        next()
    })
}

let retrieveAll = (req, res, next ) => {
    Book.find({}, (err, books) => {
        if(err !== null){
            next(err)
        }
        req.books = books
        next()
    })
}

let retrieve = (req, res, next) => {
    console.log('retrieve book')
    Book.findById(req.params.bookId)
        .populate('songs')
        .exec((err, book) => {
            if(err !== null){
                next(err)
            }
            req.book = book
            next()
        })
}

let update = (req, res, next) => {
    Book.update(
        {_id: req.params.bookId}, 
        req.body, 
        (err, result) => {
        if(err !== null){
            next(err)
        }
        req.result = result
        next()
    })
}

let deleteBook = (req, res, next) => {
    Book.remove(
        {_id: req.params.bookId}, 
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
    delete      : deleteBook
}