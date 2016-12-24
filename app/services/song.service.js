'use strict';
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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
var SongService = (function () {
    function SongService(http) {
        this.http = http;
        this.path = "http://" + location.hostname + ":3000/songs";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    SongService.prototype.save = function (song) {
        var songBody = song;
        console.log('song', song);
        console.log('songBody', songBody);
        if (song._id === '') {
            console.log('deleting');
            delete songBody._id;
            console.log('songBody', songBody);
            return this.http.post(this.path, songBody, this.options)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return this.http.put(this.path + "/" + songBody._id, songBody, this.options)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    SongService.prototype.retrieve = function (id) {
        return this.http.get(this.path + "/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SongService.prototype.retrieveAll = function () {
        return this.http.get("" + this.path)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SongService.prototype.delete = function (songId) {
        return this.http
            .delete(this.path + "/" + songId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SongService.prototype.extractData = function (res) {
        var body = res.json();
        console.log('extractData', res, body);
        return body || {};
    };
    SongService.prototype.handleError = function (error) {
        console.log(error);
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    SongService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SongService);
    return SongService;
}());
exports.SongService = SongService;
//# sourceMappingURL=song.service.js.map