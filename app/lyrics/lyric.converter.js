"use strict";
var LyricChordConverter = (function () {
    function LyricChordConverter() {
    }
    LyricChordConverter.prototype.convert = function (raw) {
        raw
            .split('\n')
            .forEach(function (line) {
        });
        return;
    };
    return LyricChordConverter;
}());
exports.LyricChordConverter = LyricChordConverter;
var LyricChord = (function () {
    function LyricChord() {
        this.lines = [];
    }
    return LyricChord;
}());
exports.LyricChord = LyricChord;
var Line = (function () {
    function Line(lyric, chord) {
        this.lyric = lyric;
        this.chord = chord;
    }
    return Line;
}());
exports.Line = Line;
var LyricChunk = (function () {
    function LyricChunk() {
    }
    return LyricChunk;
}());
exports.LyricChunk = LyricChunk;
var Chord = (function () {
    function Chord(target, chord) {
        this.target = target;
        this.chord = chord;
    }
    return Chord;
}());
exports.Chord = Chord;
//# sourceMappingURL=lyric.converter.js.map