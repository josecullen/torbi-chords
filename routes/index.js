var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log('index')
    res.sendFile(__dirname + '/index.html');
});

module.exports = router;
