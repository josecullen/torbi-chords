import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/models'

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  user:User = null 
  redirectUrl: string;

  private pathUsers: string = `http://${location.hostname}:4000/users`;

  constructor(private http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    console.log('extractData', res, body)
    return body || { };
  }
  

  private handleError (error: any) {
    let errMsg = (error.message) 
      ? error.message 
      : error.status 
          ? `${error.status} - ${error.statusText}` 
          : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  login(user:User): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.pathUsers}/login`, JSON.stringify(user), options)
                    .map(res => {
                      this.isLoggedIn = res.json().valid
                      if(this.isLoggedIn){
                        this.user = res.json().user
                      } 
                      return this.isLoggedIn
                    })
                    .catch(this.handleError);
  }

  exists(username:string):Observable<boolean> {
    return this.http.get(`${this.pathUsers}/exists/${username}`)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getUser():User{
    return this.user
  }

  signup(user:User): Observable<boolean>{
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.pathUsers, JSON.stringify(user), options)
                    .map(this.extractData)
                    .catch(this.handleError)
  }



  public logout(): void {
    this.isLoggedIn = false;
  }
}

