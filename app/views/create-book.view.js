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
var models_1 = require('../models/models');
var router_1 = require('@angular/router');
var song_service_1 = require('../services/song.service');
var book_service_1 = require('../services/book.service');
var CreateBookView = (function () {
    function CreateBookView(songService, bookService, route, router) {
        this.songService = songService;
        this.bookService = bookService;
        this.route = route;
        this.router = router;
        this.book = new models_1.SongBook();
        this.songs = [];
    }
    CreateBookView.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            console.log('id', id);
            if (id !== undefined) {
                _this.bookService
                    .retrieve(id)
                    .subscribe(function (book) {
                    book._id = book._id.toString();
                    _this.book = book;
                    _this.filterSongs();
                }, function (err) { return console.error('err', err); });
            }
        });
        this.songService
            .retrieveAll()
            .subscribe(function (songs) {
            _this.songs = songs;
            _this.filterSongs();
        }, function (err) { return console.error(err); });
    };
    CreateBookView.prototype.save = function () {
        var _this = this;
        this.bookService
            .save(this.book)
            .subscribe(function (book) { return _this.book._id = book._id; }, function (err) { return console.error(err); });
    };
    CreateBookView.prototype.filterSongs = function () {
        var _this = this;
        if (this.songs) {
            this.songs = this.songs.filter(function (song) {
                return !_this.book.songs.some(function (songInBook) { return songInBook._id.toString() === song._id.toString(); });
            });
        }
    };
    CreateBookView.prototype.print = function (el) {
        return JSON.stringify(el);
    };
    CreateBookView = __decorate([
        core_1.Component({
            template: "\n  <header>\n    <a routerLink=\"/home\">Home</a>\n  </header>\n  <section>\n        <label>T\u00EDtulo</label>\n        <input [(ngModel)]=\"book.title\">\n        <label>Autor</label>\n        <input [(ngModel)]=\"book.author\">\n        <label>Descripci\u00F3n</label>\n        <input [(ngModel)]=\"book.description\">\n        <h3>Canciones Elegidas</h3>\n        <ul>\n          <li *ngFor=\"let song of book.songs; let i = index\">\n            <div>\n              <span>{{song.title}}</span>\n              <button (click)=\"songs.push(book.songs.splice(i,1)[0])\">Remove</button>\n            </div>\n          </li>\n        </ul>\n        <h3>Todas las canciones</h3>\n        <ul>\n          <li *ngFor=\"let song of songs; let i = index\">\n            <div>\n              <span>{{song.title}}</span>\n              <button (click)=\"book.songs.push(songs.splice(i, 1)[0])\">Add</button>\n            </div>\n          </li>\n        </ul>\n\n        <button type=\"submit\" (click)=\"save()\">Guardar</button>\n  </section>\n  <footer>\n    <div>\n      <a routerLink=\"/book/create\">Crear Libro</a>\n      <a routerLink=\"/song/create\">Crear Canci\u00F3n</a>\n    </div>\n  </footer>\n",
            styles: ["\n\n:host {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\nheader {\n  min-height: 50px;\n  background-color: red;\n}\n\nsection {\n  min-height: 50px;\n  background-color: green;\n  flex-grow: 1;\n}\n\nfooter {\n  min-height: 50px;\n  background-color: aliceblue;\n}\n  \n  "]
        }), 
        __metadata('design:paramtypes', [song_service_1.SongService, book_service_1.BookService, router_1.ActivatedRoute, router_1.Router])
    ], CreateBookView);
    return CreateBookView;
}());
exports.CreateBookView = CreateBookView;
//# sourceMappingURL=create-book.view.js.map