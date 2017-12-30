import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {Shipment} from './shipment/shipment'
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';
import {Urls} from './urls';
import {UrlsProd} from './urls.prod';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ShipmentService extends ServiceBase {
  private url = Urls.SHIPMENTS;
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'ShipmentService');
    if (environment.production) {
      this.url = UrlsProd.SHIPMENTS;
    }
  }
  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.url)
      .pipe(
        tap((shipments: Shipment[]) => this.log(`fetched ${shipments.length} shipment(s)`),
          catchError(this.handleError('getShipments', [])))
      )
  }
  addShipment (shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.url, shipment, httpOptions).pipe(
      tap((shipmentResponse: Shipment) => this.log(`added shipment type w/ id=${shipmentResponse.entityID}`)),
      catchError(this.handleError<Shipment>('addShipment'))
    )
  }
}
