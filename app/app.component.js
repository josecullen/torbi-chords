"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// <div class="no-print">
//   <textarea rows="10" cols="70" [(ngModel)]="value"></textarea>
//   <button (click)="convertSongs()">Convert</button>
// </div>
var AppComponent = (function () {
    function AppComponent() {
        this.value = "";
        this.songs = new Array();
    }
    AppComponent.prototype.convertSongs = function () {
        var _this = this;
        this.songs = new Array();
        var songsLines = this.divideSongs(this.value);
        songsLines.forEach(function (songLines) {
            var song = {
                title: "",
                sections: new Array()
            };
            var _loop_1 = function(i) {
                var line = songLines[i];
                if (line.includes('song')) {
                    song.title = _this.extractTitle(line);
                }
                else if (line.includes("section")) {
                    var section = {
                        title: _this.extractTitle(line),
                        lines: new Array()
                    };
                    song.sections.push(section);
                }
                else if (line.includes("|")) {
                    var songLine_1 = {
                        instructions: new Array(),
                        bars: new Array()
                    };
                    line.split('|')
                        .filter(function (bar) { return bar.trim() !== ""; })
                        .forEach(function (barRaw) {
                        songLine_1.bars.push(_this.createBar(barRaw));
                        songLine_1.instructions.push(_this.obtainInstruction(barRaw));
                    });
                    song.sections[song.sections.length - 1]
                        .lines
                        .push(songLine_1);
                }
            };
            for (var i = 0; i < songLines.length; i++) {
                _loop_1(i);
            }
            _this.songs.push(song);
        });
        console.log('songs', this.songs);
    };
    AppComponent.prototype.divideSongs = function (lines) {
        var songLines = new Array();
        var songsLines = new Array();
        lines
            .split('\n')
            .forEach(function (line) {
            if (line.includes('song')) {
                if (songLines.length > 0) {
                    songsLines.push(songLines);
                }
                songLines = new Array();
            }
            songLines.push(line);
        });
        songsLines.push(songLines);
        return songsLines;
    };
    AppComponent.prototype.createBar = function (barRaw) {
        var bar = {
            chords: new Array(),
            type: this.obtainBarType(barRaw)
        };
        var chords = barRaw
            .split(' ')
            .map(function (chord) { return chord.replace(":", "").trim(); })
            .filter(function (chord) { return chord !== ""; })
            .filter(function (chord) { return !chord.includes('('); });
        bar.chords = chords;
        return bar;
    };
    AppComponent.prototype.obtainBarType = function (barRaw) {
        var type = 'common';
        if (barRaw.includes(':')) {
            barRaw.trim().split(' ')[0] === ":"
                ? type = "repeat-start"
                : type = "repeat-end";
        }
        return type;
    };
    AppComponent.prototype.obtainInstruction = function (barRaw) {
        var instruction = false;
        if (barRaw.includes('(') && barRaw.includes(')')) {
            var instructionsRaw = this.extractInstructions(barRaw);
            if (instructionsRaw.includes('condition=')) {
                var condition = /condition=(\d)/;
                instruction = {
                    condition: instructionsRaw.match(condition)[1] + "."
                };
            }
        }
        return instruction;
    };
    AppComponent.prototype.extractTitle = function (str) {
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
    AppComponent.prototype.extractInstructions = function (str) {
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(str);
        return matches[1];
    };
    AppComponent.prototype.calculateWidth = function (line) {
        var barLength = line.bars.length;
        var width = barLength >= 4
            ? "100%"
            : barLength === 3
                ? "75%"
                : barLength === 2
                    ? "50%"
                    : "25%";
        return width;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n<router-outlet></router-outlet>\n",
            styles: ["\n    :host {\n      height: 100%;\n    }\n\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*

song "flaca"
  section "intro"
    |: G | B7 | Em | C :|
    | G | D  | G  | D |

    

*/
//# sourceMappingURL=app.component.js.map