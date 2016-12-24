"use strict";
var ChordConverter = (function () {
    function ChordConverter() {
    }
    ChordConverter.convert = function (rawSong) {
        var _this = this;
        this.chordSong = new ChordSong();
        rawSong
            .split('\n')
            .forEach(function (line) {
            if (line.includes('song')) {
                _this.chordSong.title = _this.extractTitle(line);
            }
            else if (line.includes("section")) {
                var section = new SongSection(_this.extractTitle(line));
                _this.chordSong.sections.push(section);
            }
            else if (line.includes("|")) {
                var songLine = new SongLine(line);
                _this.chordSong
                    .sections[_this.chordSong.sections.length - 1]
                    .lines
                    .push(songLine);
            }
        });
        return this.chordSong;
    };
    ChordConverter.extractTitle = function (str) {
        var ret = "";
        if (/"/.test(str)) {
            ret = str.match(/"(.*?)"/)[1];
            console.log('str', str, 'ret', ret);
        }
        else {
            ret = str;
        }
        return ret;
    };
    return ChordConverter;
}());
exports.ChordConverter = ChordConverter;
var ChordSong = (function () {
    function ChordSong() {
        this.title = '';
        this.sections = [];
    }
    return ChordSong;
}());
exports.ChordSong = ChordSong;
var SongSection = (function () {
    function SongSection(title, lines) {
        if (title === void 0) { title = ''; }
        if (lines === void 0) { lines = []; }
        this.title = title;
        this.lines = lines;
    }
    return SongSection;
}());
exports.SongSection = SongSection;
var SongLine = (function () {
    function SongLine(rawLine) {
        var _this = this;
        this.instructions = [];
        this.bars = [];
        rawLine
            .split('|')
            .filter(function (bar) { return bar.trim() !== ""; })
            .forEach(function (rawBar) {
            _this.bars.push(new Bar(rawBar));
            _this.instructions.push(new Instruction(rawBar));
        });
    }
    return SongLine;
}());
exports.SongLine = SongLine;
var Bar = (function () {
    function Bar(barRaw) {
        this.type = 'common';
        this.chords = [];
        if (barRaw.includes(':')) {
            barRaw.trim().split(' ')[0] === ":"
                ? this.type = "repeat-start"
                : this.type = "repeat-end";
        }
        this.chords = barRaw
            .split(' ')
            .map(function (chord) { return chord.replace(":", "").trim(); })
            .filter(function (chord) { return chord !== ""; })
            .filter(function (chord) { return !chord.includes('('); });
    }
    return Bar;
}());
exports.Bar = Bar;
var Instruction = (function () {
    function Instruction(barRaw) {
        this.hasInstruction = false;
        var instruction = false;
        if (barRaw.includes('(') && barRaw.includes(')')) {
            var instructionsRaw = this.extractInstructions(barRaw);
            if (instructionsRaw.includes('condition=')) {
                this.hasInstruction = true;
                var condition = /condition=(\d)/;
                this.condition = instructionsRaw.match(condition)[1] + ".";
            }
        }
    }
    Instruction.prototype.extractInstructions = function (str) {
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(str);
        return matches[1];
    };
    return Instruction;
}());
exports.Instruction = Instruction;
//# sourceMappingURL=chords.converter.js.map