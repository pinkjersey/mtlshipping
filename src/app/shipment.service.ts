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
import {Container} from './container-detail/container';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ShipmentService extends ServiceBase {
  private url = Urls.SHIPMENTS;
  private containerUrl = Urls.CONTAINERS;
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'ShipmentService');
    if (environment.production) {
      this.url = UrlsProd.SHIPMENTS;
      this.url = UrlsProd.CONTAINERS;
    }
  }
  getShipment(id: string): Observable<Shipment> {
    const urlWithID = `${this.url}/${id}`;
    return this.http.get<Shipment>(urlWithID).pipe(
      tap(_ => this.log(`fetched shipment id=${id}`)),
      catchError(this.handleError<Shipment>(`getShipment id=${id}`))
    );
  }
  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.url)
      .pipe(
        tap((shipments: Shipment[]) => this.log(`fetched ${shipments.length} shipment(s)`),
          catchError(this.handleError('getShipments', [])))
      )
  }
  addShipment (shipment: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(this.url, shipment, httpOptions).pipe(
      tap((shipmentResponse: Shipment) => this.log(`added shipment type w/ id=${shipmentResponse.entityID}`)),
      catchError(this.handleError<Shipment>('addShipment'))
    )
  }
  getShipmentContainers(id: string): Observable<Container[]> {
    const url = `${this.url}/${id}/containers`;
    return this.http.get<Container[]>(url)
      .pipe(
        tap(containers => this.log(`fetched containers`)),
        catchError(this.handleError('getShipmentContainers', []))
      );
  }
  updateShipment(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.url, shipment, httpOptions).pipe(
      tap((response: Shipment) => this.log(`updated shipment w/ id=${response.entityID}`)),
      catchError(this.handleError<Shipment>('updateShipment'))
    );
  }
  addContainerToShipment(container: Container): Observable<Container> {
    return this.http.put<Container>(this.containerUrl, container, httpOptions).pipe(
      tap((response: Container) => this.log(`added container w/ id=${response.entityID}`)),
      catchError(this.handleError<Container>('addContainerToShipment'))
    );
  }
}
