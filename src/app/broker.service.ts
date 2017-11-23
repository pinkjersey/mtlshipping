import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {Broker} from './broker/broker';
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BrokerService extends ServiceBase {
  private url = 'http://localhost:8080/brokers';  // URL to web ap
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'BrokerService');
  }
  /** GET brokers from the server */
  getBrokers(): Observable<Broker[]> {
    return this.http.get<Broker[]>(this.url)
      .pipe(
        tap(heroes => this.log(`fetched brokers`)),
        catchError(this.handleError('getBrokers', []))
      );
  }
  addBroker (broker: Broker): Observable<Broker> {
    return this.http.post<Broker>(this.url, broker, httpOptions).pipe(
      tap((brokerResponse: Broker) => this.log(`added broker w/ id=${brokerResponse.entityID}`)),
      catchError(this.handleError<Broker>('addBroker'))
    );
  }
}
