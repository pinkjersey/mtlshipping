import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { MessageService } from './message.service';
import {ServiceBase} from './serviceBase';
import {PurchaseOrder} from './purchase-order-detail/purchaseOrder';
import {OurPurchaseOrder} from './our-purchase-order-detail/ourPurchaseOrder';
import {catchError, tap} from 'rxjs/operators';
import {Item} from './item-details/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PurchaseOrderService extends ServiceBase {
  private url = 'http://localhost:8080/purchaseOrders';
  private ourPOUrl = 'http://localhost:8080/ourPurchaseOrders';
  private itemsUrl = 'http://localhost:8080/items';

  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'PurchaseOrderService');
  }

  getPOs(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.url).pipe(
      tap(_ => this.log(`fetched POs`)),
      catchError(this.handleError<PurchaseOrder>(`getPOs`))
    );
  }

  getPO(id: string): Observable<PurchaseOrder> {
    const url = `${this.url}/${id}`;
    return this.http.get<PurchaseOrder>(url).pipe(
      tap(_ => this.log(`fetched PO id=${id}`)),
      catchError(this.handleError<PurchaseOrder>(`getPO id=${id}`))
    );
  }

  getOurPO(id: string): Observable<OurPurchaseOrder> {
    const url = `${this.ourPOUrl}/${id}`;
    return this.http.get<OurPurchaseOrder>(url).pipe(
      tap(_ => this.log(`fetched our PO id=${id}`)),
      catchError(this.handleError<OurPurchaseOrder>(`getOurPO id=${id}`))
    );
  }

  getPOItems(id: string): Observable<Item[]> {
    const url = `${this.url}/${id}/items`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(items => this.log(`fetched items`)),
        catchError(this.handleError('getPOItems', []))
      );
  }

  getOurPOItems(id: string): Observable<Item[]> {
    const url = `${this.ourPOUrl}/${id}/items`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(items => this.log(`fetched items for our PO`)),
        catchError(this.handleError('getOurPOItems', []))
      );
  }

  // This is how new items are created
  addItemToPO(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemsUrl, item, httpOptions).pipe(
      tap((response: Item) => this.log(`added item w/ id=${response.entityID}`)),
      catchError(this.handleError<Item>('addItemToPO'))
    );
  }

  addItemToOurPO(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions).pipe(
      tap((response: Item) => this.log(`added item w/ id=${response.entityID}`)),
      catchError(this.handleError<Item>('addItemToOurPO'))
    );
  }

  updateOurPurchaseOrder(po: OurPurchaseOrder): Observable<OurPurchaseOrder> {
    return this.http.post<OurPurchaseOrder>(this.ourPOUrl, po, httpOptions).pipe(
      tap((response: OurPurchaseOrder) => this.log(`added po  w/ id=${response.entityID}`)),
      catchError(this.handleError<OurPurchaseOrder>('addOurPurchaseOrder'))
    );
  }
}
