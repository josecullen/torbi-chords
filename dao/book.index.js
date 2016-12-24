/**
 * Created by josecullen on 13/09/16.
 */
'use strict'
var express = require('express');
var router = express.Router();
let q = require('q')
let bookDao = require('./book.dao')

router.get('/',
    bookDao.retrieveAll,
    (req, res, next) => {
        res.send(req.books)
    }
)

router.get('/:bookId',
    bookDao.retrieve,
    (req, res ) => {
        res.send(req.book)
    }
)

router.post('/', 
    (req, res, next ) => {
        next()
    },
    bookDao.create,
    (req, res, next ) => {
        res.send(req.book)
    }
)

router.put('/:bookId',
    bookDao.update,
    (req, res, next ) => {
        res.send(req.result)
    }
)

router.delete('/:bookId',
    bookDao.delete,
    (req, res, next) => {
        res.send(req.result)
    }
)

module.exports = router;