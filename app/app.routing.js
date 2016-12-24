"use strict";
var router_1 = require('@angular/router');
var home_view_1 = require('./views/home.view');
var create_book_view_1 = require('./views/create-book.view');
var create_song_view_1 = require('./views/create-song.view');
var lyric_song_view_1 = require('./views/lyric-song.view');
var appRouting = [
    {
        path: 'home',
        component: home_view_1.HomeView
    },
    {
        path: 'book/create',
        component: create_book_view_1.CreateBookView
    },
    {
        path: 'book/:id',
        component: create_book_view_1.CreateBookView
    },
    {
        path: 'song/create',
        component: create_song_view_1.CreateSongView
    },
    {
        path: 'song/:id',
        component: create_song_view_1.CreateSongView
    },
    {
        path: 'lyric-song/create',
        component: lyric_song_view_1.LyricSongView
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
var appRoutes = appRouting.slice();
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map