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
var HomeView = (function () {
    function HomeView(songService, bookService) {
        this.songService = songService;
        this.bookService = bookService;
        this.songs = [];
        this.books = [];
    }
    HomeView.prototype.ngOnInit = function () {
        var _this = this;
        this.songService
            .retrieveAll()
            .subscribe(function (songs) { return _this.songs = songs; }, function (err) { return console.error(err); });
        this.bookService
            .retrieveAll()
            .subscribe(function (books) { return _this.books = books; }, function (err) { return console.error(err); });
    };
    HomeView.prototype.print = function (song) {
        return JSON.stringify(song);
    };
    HomeView = __decorate([
        core_1.Component({
            template: "\n\n  <header></header>\n  <section>\n    <h3>Canciones</h3>\n    <div *ngFor=\"let song of songs\">\n      <a routerLink=\"../song/{{song._id}}\">{{song.title}}</a>\n      <br>\n    </div>\n    <h3>Libros de canciones</h3>\n    <div *ngFor=\"let book of books\">\n      <a routerLink=\"../book/{{book._id}}\">{{book.title}}</a>\n      <br>\n    </div>\n  </section>\n  <footer>\n    <div>\n      <a routerLink=\"/book/create\">Crear Libro</a>\n      <a routerLink=\"/song/create\">Crear Canci\u00F3n</a>\n      <a routerLink=\"/lyric-song/create\">Crear Letra y Acordes</a>\n    </div>\n  </footer>\n",
            styles: ["\n\n:host {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\nheader {\n  min-height: 50px;\n  background-color: red;\n}\n\nsection {\n  min-height: 50px;\n  background-color: green;\n  flex-grow: 1;\n}\n\nfooter {\n  min-height: 50px;\n  background-color: aliceblue;\n}\n  \n  "]
        }), 
        __metadata('design:paramtypes', [song_service_1.SongService, book_service_1.BookService])
    ], HomeView);
    return HomeView;
}());
exports.HomeView = HomeView;
//# sourceMappingURL=home.view.js.map