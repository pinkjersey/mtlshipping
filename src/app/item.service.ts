import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { MessageService } from './message.service';
import {ServiceBase} from './serviceBase';
import {catchError, tap} from 'rxjs/operators';
import {Item} from './item-details/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemService extends ServiceBase {
  private itemsUrl = 'http://localhost:8080/items';
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'ItemService');
  }

  getItem(id: string): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions).pipe(
      tap((response: Item) => this.log(`updated item w/ id=${response.entityID}`)),
      catchError(this.handleError<Item>('updateItem'))
    );
  }
}
