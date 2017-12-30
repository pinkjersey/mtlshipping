import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {Vessel} from './vessel/vessel'
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';
import {Urls} from './urls';
import {UrlsProd} from './urls.prod';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VesselService extends ServiceBase {
  private url = Urls.VESSELS;

  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'VesselService');
    if (environment.production) {
      this.url = UrlsProd.VESSELS;
    }
  }
  getVessels(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(this.url)
      .pipe(
        tap(vessels => this.log(`fetched vessels`)),
        catchError(this.handleError('getVessels', []))
      );
  }
  addVessel (vessel: Vessel): Observable<Vessel> {
    return this.http.post<Vessel>(this.url, vessel, httpOptions).pipe(
      tap((vesselResponse: Vessel) => this.log(`added vessel w/ id=${vesselResponse.entityID}`)),
      catchError(this.handleError<Vessel>('addVessel'))
    );
  }
}
