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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var bars_component_1 = require('./bars/bars.component');
var sections_component_1 = require('./sections/sections.component');
var notes_component_1 = require('./notes/notes.component');
var song_service_1 = require('./services/song.service');
var book_service_1 = require('./services/book.service');
var home_view_1 = require('./views/home.view');
var create_book_view_1 = require('./views/create-book.view');
var create_song_view_1 = require('./views/create-song.view');
var lyric_song_view_1 = require('./views/lyric-song.view');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                app_routing_1.routing
            ],
            declarations: [
                home_view_1.HomeView,
                create_book_view_1.CreateBookView,
                create_song_view_1.CreateSongView,
                lyric_song_view_1.LyricSongView,
                app_component_1.AppComponent,
                bars_component_1.Bar,
                bars_component_1.LineBar,
                bars_component_1.Bars,
                notes_component_1.HalfNote,
                notes_component_1.QuarterNote,
                notes_component_1.Chords,
                bars_component_1.BarRepeatStart,
                bars_component_1.BarRepeatEnd,
                bars_component_1.Instructions,
                bars_component_1.Condition,
                bars_component_1.BarNoBorder,
                sections_component_1.Section,
                sections_component_1.Song
            ],
            providers: [
                song_service_1.SongService,
                book_service_1.BookService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map