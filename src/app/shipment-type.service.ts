import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {ShipmentType} from './shipment-type/shipment-type'
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ShipmentTypeService extends ServiceBase {
  private url = 'http://localhost:8080/shipmenttype';  // URL to web ap
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'ShipmentTypeService');
  }
  getShipmentTypes(): Observable<ShipmentType[]> {
    return this.http.get<ShipmentType[]>(this.url)
      .pipe(
        tap(shipmentTypes => this.log(`fetched shipment types`)),
        catchError(this.handleError('getShipmentTypes', []))
      );
  }
  addShipmentType (shipmentTypes: ShipmentType): Observable<ShipmentType> {
    return this.http.post<ShipmentType>(this.url, shipmentTypes, httpOptions).pipe(
      tap((shipmentTypeResponse: ShipmentType) => this.log(`added shipment type w/ id=${shipmentTypeResponse.entityID}`)),
      catchError(this.handleError<ShipmentType>('addShipmentType'))
    );
  }
}
