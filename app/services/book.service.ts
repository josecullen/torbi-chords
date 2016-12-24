'use strict'
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Song, SongBook } from '../models/models'
import 'rxjs/Rx'
@Injectable()
export class BookService{

  private path: string = `http://${location.hostname}:3000/books`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }


  save(book:SongBook):Observable<SongBook>{
    let bookBody = book
    // console.log('song', song)
    // console.log('songBody',songBody)
    // book.songs.map(song => song.)
    if(bookBody._id === ''){
      console.log('deleting')
      delete bookBody._id
    //   console.log('songBody', songBody)
      return this.http.post(this.path, bookBody, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http.put(`${this.path}/${bookBody._id}`, bookBody, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  retrieve(id:string):Observable<SongBook>{
      return this.http.get(`${this.path}/${id}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  retrieveAll():Observable<Array<SongBook>>{
      return this.http.get(`${this.path}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  delete(bookId:string):Observable<any>{
    return this.http
        .delete(`${this.path}/${bookId}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('extractData', res, body)
    return body || { };
  }

  private handleError (error: any) {
    console.log(error)
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }



}


