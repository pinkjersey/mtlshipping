import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { MessageService } from './message.service';
import {ServiceBase} from './serviceBase';
import {PurchaseOrder} from './purchase-order-detail/purchaseOrder';
import {catchError, tap} from 'rxjs/operators';
import {Item} from './purchase-order-detail/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PurchaseOrderService extends ServiceBase {
  private url = 'http://localhost:8080/purchaseOrders';
  private itemsUrl = 'http://localhost:8080/items';

  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'PurchaseOrderService');
  }

  getPO(id: string): Observable<PurchaseOrder> {
    const url = `${this.url}/${id}`;
    return this.http.get<PurchaseOrder>(url).pipe(
      tap(_ => this.log(`fetched PO id=${id}`)),
      catchError(this.handleError<PurchaseOrder>(`getPO id=${id}`))
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

  // This is how new items are created
  addItemToPO(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemsUrl, item, httpOptions).pipe(
      tap((response: Item) => this.log(`added item w/ id=${response.entityID}`)),
      catchError(this.handleError<Item>('addItemToPO'))
    );
  }
}
