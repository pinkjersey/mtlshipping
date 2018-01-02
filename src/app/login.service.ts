import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Urls} from './urls';
import {environment} from '../environments/environment';
import {UrlsProd} from './urls.prod';
import {catchError, tap, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {ServiceBase} from './serviceBase';
import {MessageService} from './message.service';
import {Credentials} from './login/credentials';
import {User} from './login/user';
import {Item} from "./item-details/item";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService extends ServiceBase {
  private url = Urls.LOGIN;
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'VesselService');
    if (environment.production) {
      this.url = UrlsProd.LOGIN;
    }
  }
  // localStorage.setItem('token', 'bogustoken');
  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(this.url, credentials, httpOptions).pipe(
      tap((response: User) => {
        console.log(`${response.fullName} logged on`);
        localStorage.setItem('token', response.token);
      }),
      catchError(this.handleError<Item>('updateItem'))
    )
  }



}
