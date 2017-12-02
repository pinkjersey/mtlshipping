import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {Vendor} from './vendor/vendor';
import { Item } from './purchase-order-detail/item'
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';
import {OurPurchaseOrder} from "./our-purchase-order-detail/ourPurchaseOrder";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VendorService extends ServiceBase {
  private url = 'http://localhost:8080/vendors';  // URL to web ap
  private urlForPurchaseOrders = 'http://localhost:8080/ourPurchaseOrders';
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'VendorService');
  }
  /** GET vendors from the server */
  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.url)
      .pipe(
        tap(vendors => this.log(`fetched vendors`)),
        catchError(this.handleError('getVendors', []))
      );
  }

  getVendorPOs(id: string): Observable<OurPurchaseOrder[]> {
    const url = `${this.url}/${id}/purchaseOrders`;
    return this.http.get<OurPurchaseOrder[]>(url)
      .pipe(
        tap(designColors => this.log(`fetched vendor purchase orders`)),
        catchError(this.handleError('getVendorPOs', []))
      );
  }

  getUnassignedItems(id: string): Observable<Item[]> {
    const url = `${this.url}/${id}/unassignedItems`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(designColors => this.log(`fetched vendor unassigned items`)),
        catchError(this.handleError('getUnassignedItems', []))
      );
  }

  getVendor(id: string): Observable<Vendor> {
    const url = `${this.url}/${id}`;
    return this.http.get<Vendor>(url).pipe(
      tap(_ => this.log(`fetched vendor id=${id}`)),
      catchError(this.handleError<Vendor>(`getVendor id=${id}`))
    );
  }

  addVendor (vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.url, vendor, httpOptions).pipe(
      tap((vendorResponse: Vendor) => this.log(`added vendor w/ id=${vendorResponse.entityID}`)),
      catchError(this.handleError<Vendor>('addVendor'))
    );
  }

  addOurPurchaseOrder(po: OurPurchaseOrder): Observable<OurPurchaseOrder> {
    return this.http.post<OurPurchaseOrder>(this.urlForPurchaseOrders, po, httpOptions).pipe(
      tap((response: OurPurchaseOrder) => this.log(`added po  w/ id=${response.entityID}`)),
      catchError(this.handleError<OurPurchaseOrder>('addOurPurchaseOrder'))
    );
  }
}
