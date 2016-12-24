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
var chords_converter_1 = require('../chords/chords.converter');
var song_service_1 = require('../services/song.service');
var models_1 = require('../models/models');
var router_1 = require('@angular/router');
var CreateSongView = (function () {
    function CreateSongView(songService, route, router) {
        this.songService = songService;
        this.route = route;
        this.router = router;
        this.song = new models_1.Song();
        this.preview = false;
    }
    CreateSongView.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            if (id !== undefined) {
                _this.songService
                    .retrieve(id)
                    .subscribe(function (song) {
                    _this.song = new models_1.Song(song.title, song.author, song.raw, song['_id'].toString());
                }, function (err) { return console.error(err); });
            }
        });
    };
    CreateSongView.prototype.delete = function () {
        var _this = this;
        this.songService
            .delete(this.song._id)
            .subscribe(function (result) {
            console.log("ok!");
            _this.router.navigateByUrl('/home');
        }, function (err) { return console.error(err); });
    };
    CreateSongView.prototype.convert = function () {
        this.previewSong = chords_converter_1.ChordConverter.convert(this.song.raw);
        console.log(this.previewSong);
    };
    CreateSongView.prototype.setPreview = function (wantPreview) {
        this.preview = wantPreview;
        this.convert();
    };
    CreateSongView.prototype.save = function () {
        this.songService
            .save(this.song)
            .subscribe(function (song) { return console.log(song); }, function (err) { return console.error(err); });
    };
    CreateSongView.prototype.calculateWidth = function (line) {
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
    CreateSongView = __decorate([
        core_1.Component({
            template: "\n\n<div *ngIf=\"!preview\" class=\"container\">\n  <header>\n    <a routerLink=\"/home\">Home</a>\n  </header>  \n  <section>\n        <label>T\u00EDtulo</label>\n        <input [(ngModel)]=\"song.title\">\n        <label>Autor</label>\n        <input [(ngModel)]=\"song.author\">\n        <textarea [(ngModel)]=\"song.raw\" rows=\"20\"></textarea>\n        <button type=\"submit\" (click)=\"save() \">Guardar</button>\n        <button *ngIf=\"song._id !== ''\" (click)=\"delete() \">Eliminar</button>\n  </section>\n  <footer>\n    <div>\n      <a (click)=\"setPreview(true)\">Preview</a>\n      <a routerLink=\"book/create\">Crear Libro</a>\n      <a routerLink=\"song/create\">Crear Canci\u00F3n</a>\n    </div>\n  </footer>\n</div>\n\n<div *ngIf=\"preview\" class=\"container\">\n<header>\n    <a (click)=\"setPreview(false)\">Preview</a>\n</header>\n\n\n<section>\n  <song [name]=\"previewSong.title\">\n    <section-song *ngFor=\"let section of previewSong.sections\" [description]=\"section.title\">\n      <line-bar *ngFor=\"let line of section.lines\" [style.width]=\"calculateWidth(line)\">\n        <instructions>\n          <bar-no-border *ngFor=\"let instruction of line.instructions\">\n            <chords *ngIf=\"instruction.hasInstruction\">\n              <condition [condition]=\"instruction.condition\"></condition>\n            </chords>\n          </bar-no-border>\n        </instructions>\n        <bars>\n          <bar [type]=\"bar.type\" *ngFor=\"let bar of line.bars\">\n            <chords>\n              <quarter-note *ngFor=\"let chord of bar.chords\" [note]=\"chord\"></quarter-note>\n            </chords>\n          </bar>\n        </bars>\n      </line-bar>\n    </section-song>\n  </song>  \n</section>\n\n\n\n</div>\n\n\n",
            styles: ["\n\n:host {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\n.container {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\nheader {\n  min-height: 50px;\n  background-color: red;\n}\n\nsection {\n  min-height: 50px;\n  background-color: green;\n  flex-grow: 1;\n}\n\nfooter {\n  min-height: 50px;\n  background-color: blue;\n}\n\ntextarea {\n  width: 80%;\n  height: 50%;\n}\n\n  \n  "]
        }), 
        __metadata('design:paramtypes', [song_service_1.SongService, router_1.ActivatedRoute, router_1.Router])
    ], CreateSongView);
    return CreateSongView;
}());
exports.CreateSongView = CreateSongView;
//# sourceMappingURL=create-song.view.js.map