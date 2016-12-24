"use strict";
var SongBook = (function () {
    function SongBook(title, author, decription, songs, _id) {
        if (title === void 0) { title = ''; }
        if (author === void 0) { author = ''; }
        if (decription === void 0) { decription = ''; }
        if (songs === void 0) { songs = []; }
        if (_id === void 0) { _id = ''; }
        this.title = title;
        this.author = author;
        this.decription = decription;
        this.songs = songs;
        this._id = _id;
    }
    return SongBook;
}());
exports.SongBook = SongBook;
var Song = (function () {
    function Song(title, author, raw, _id) {
        if (title === void 0) { title = ''; }
        if (author === void 0) { author = ''; }
        if (raw === void 0) { raw = ''; }
        if (_id === void 0) { _id = ''; }
        this.title = title;
        this.author = author;
        this.raw = raw;
        this._id = _id;
    }
    return Song;
}());
exports.Song = Song;
//# sourceMappingURL=models.js.map