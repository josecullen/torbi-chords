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
var song_service_1 = require('../services/song.service');
var book_service_1 = require('../services/book.service');
var platform_browser_1 = require('@angular/platform-browser');
var LyricSongView = (function () {
    function LyricSongView(songService, bookService, sanitizer) {
        this.songService = songService;
        this.bookService = bookService;
        this.sanitizer = sanitizer;
        this.preview = false;
        this.raw = "\n    Flaca[G] no me cla[B7]ves, \n    tus pu\u00F1ales[Em] por la espalda[C]\n    tan profundo[G] no me duelen [D7]\n    no me hacen mal[G]    [D7]\n    ";
        this.songPreview = [];
        // this.s = this.sanitizer.bypassSecurityTrustStyle("calc(-i * 6em)")
        this.s = this.sanitizer.bypassSecurityTrustStyle("-2em");
        console.log(this.s);
    }
    LyricSongView.prototype.calculateLeft = function (i) {
        console.log(i, (i * 0.6) + "em;");
        this.s = this.sanitizer.bypassSecurityTrustStyle((i * 0.6) + "em;");
        return this.sanitizer.bypassSecurityTrustStyle("2em");
    };
    LyricSongView.prototype.ngOnInit = function () { };
    LyricSongView.prototype.setPreview = function (show) {
        var _this = this;
        this.preview = show;
        if (show) {
            this.songPreview = [];
            this
                .raw
                .split('\n')
                .forEach(function (lineRaw) {
                if (lineRaw.trim() !== '') {
                    var line = [];
                    while (lineRaw.includes('[')) {
                        var beginChord = lineRaw.indexOf('[');
                        var endChord = lineRaw.indexOf(']');
                        var text = lineRaw.substring(0, beginChord);
                        var segment = {
                            text: text,
                            chord: lineRaw.substring(beginChord + 1, endChord)
                        };
                        line.push(segment);
                        lineRaw = lineRaw.substring(endChord + 1, lineRaw.length);
                    }
                    line.push({ text: lineRaw });
                    _this.songPreview.push(line);
                }
            });
        }
    };
    LyricSongView = __decorate([
        core_1.Component({
            template: "\n\n  <header></header>\n  <section>\n    <div *ngIf=\"!preview\" class=\"container\">\n        <textarea [(ngModel)]=\"raw\" style=\"width:300px; height:100px;\"></textarea>   \n    </div>\n    <div *ngIf=\"preview\" class=\"container song-preview\">\n        <p *ngFor=\"let line of songPreview\">\n            <span *ngFor=\"let segment of line; let i = index\">\n                <span \n                    class=\"text\" [ngClass]=\"'text-left-'+i\" >{{segment.text}}</span>\n                <span class=\"chord\" *ngIf=\"segment.chord !== undefined\">{{segment.chord}}</span>\n            </span>\n        </p>\n    </div> \n  </section>\n  <footer>\n    <div>\n      <button (click)=\"setPreview(!preview)\">Preview</button>\n      <a routerLink=\"/book/create\">Crear Libro</a>\n      <a routerLink=\"/song/create\">Crear Canci\u00F3n</a>\n    </div>\n  </footer>\n\n",
            styles: ["\n\n:host {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\nheader {\n  min-height: 50px;\n  background-color: red;\n}\n\nsection {\n  min-height: 50px;\n  background-color: green;\n  flex-grow: 1;\n}\n\nfooter {\n  min-height: 50px;\n  background-color: aliceblue;\n}\n\n.song-preview {\n    line-height:1em; \n    margin-bottom:1.1em;  \n    font-family: Arial;\n}\n\n.text-left-1 {\n    left: -0.6em;\n}\n\n.text-left-2 {\n    left: -1.2em;\n}\n\n.text-left-3 {\n    left: -1.8em;\n}\n\n.chord {\n    position: relative;\n    top: -1em;\n    left: -1em;\n    display:inline-block; \n    width: 0;\n    overflow:visible; \n    color:#00F;\n    font-weight:bold;\n    font-family: Arial;\n    text-decoration: none;\n}\n  \n.text {\n    position: relative;\n    white-space:pre;\n}\n  "]
        }), 
        __metadata('design:paramtypes', [song_service_1.SongService, book_service_1.BookService, platform_browser_1.DomSanitizer])
    ], LyricSongView);
    return LyricSongView;
}());
exports.LyricSongView = LyricSongView;
//# sourceMappingURL=lyric-song.view.js.map