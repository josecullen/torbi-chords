'use strict'
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Song } from '../models/models'
import 'rxjs/Rx'
@Injectable()
export class SongService{

  private path: string = `http://${location.hostname}:3000/songs`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }


  save(song:Song):Observable<Song>{
    let songBody = song
    console.log('song', song)
    console.log('songBody',songBody)
    if(song._id === ''){
      console.log('deleting')
      delete songBody._id
      console.log('songBody', songBody)
      return this.http.post(this.path, songBody, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http.put(`${this.path}/${songBody._id}`, songBody, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  retrieve(id:string):Observable<Song>{
      return this.http.get(`${this.path}/${id}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  retrieveAll():Observable<Array<Song>>{
      return this.http.get(`${this.path}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  delete(songId:string):Observable<any>{
    return this.http
        .delete(`${this.path}/${songId}`)
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


