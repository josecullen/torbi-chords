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
var BookService = (function () {
    function BookService(http) {
        this.http = http;
        this.path = "http://" + location.hostname + ":3000/books";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    BookService.prototype.save = function (book) {
        var bookBody = book;
        // console.log('song', song)
        // console.log('songBody',songBody)
        // book.songs.map(song => song.)
        if (bookBody._id === '') {
            console.log('deleting');
            delete bookBody._id;
            //   console.log('songBody', songBody)
            return this.http.post(this.path, bookBody, this.options)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return this.http.put(this.path + "/" + bookBody._id, bookBody, this.options)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    BookService.prototype.retrieve = function (id) {
        return this.http.get(this.path + "/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookService.prototype.retrieveAll = function () {
        return this.http.get("" + this.path)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookService.prototype.delete = function (bookId) {
        return this.http
            .delete(this.path + "/" + bookId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookService.prototype.extractData = function (res) {
        var body = res.json();
        console.log('extractData', res, body);
        return body || {};
    };
    BookService.prototype.handleError = function (error) {
        console.log(error);
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    BookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map