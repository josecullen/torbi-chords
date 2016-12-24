/**
 * Created by josecullen on 13/09/16.
 */
'use strict'
var express = require('express');
var router = express.Router();
let q = require('q')
let songDao = require('./songs.dao')

router.get('/',
    songDao.retrieveAll,
    (req, res, next) => {
        res.send(req.songs)
    }
)

router.get('/:songId',
    songDao.retrieve,
    (req, res, next) => {
        res.send(req.song)
    }
)

router.post('/', 
    (req, res, next ) => {
        console.log('post /songs')
        next()
    },
    songDao.create,
    (req, res, next ) => {
        res.send(req.song)
    }
)

router.put('/:songId',
    songDao.update,
    (req, res, next ) => {
        res.send(req.result)
    }
)

router.delete('/:songId',
    songDao.delete,
    (req, res, next) => {
        res.send(req.result)
    }
)

module.exports = router;