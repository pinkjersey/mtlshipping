import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';
import {Urls} from './urls';
import {UrlsProd} from './urls.prod';
import {environment} from '../environments/environment';
import {Container} from './container-detail/container';
import {Item} from './item-details/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContainerService extends ServiceBase {
  private url = Urls.CONTAINERS;
  private itemsUrl = Urls.ITEMS;
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'Containerservice');
    if (environment.production) {
      this.url = UrlsProd.CONTAINERS;
      this.itemsUrl = UrlsProd.ITEMS;
    }
  }
  getContainers(): Observable<Container[]> {
    return this.http.get<Container[]>(this.url)
      .pipe(
        tap(containers => this.log(`fetched containers`)),
        catchError(this.handleError('getContainers', []))
      );
  }
  getContainer(id: string): Observable<Container> {
    const url = `${this.url}/${id}`;
    return this.http.get<Container>(url).pipe(
      tap(_ => this.log(`fetched container id=${id}`)),
      catchError(this.handleError<Container>(`getContainer id=${id}`))
    );
  }

  getContainerItems(id: string): Observable<Item[]> {
    const url = `${this.url}/${id}/items`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(items => this.log(`fetched items for container`)),
        catchError(this.handleError('getContainerItems', []))
      );
  }

  addItemToContainer(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions).pipe(
      tap((response: Item) => this.log(`added item w/ id=${response.entityID}`)),
      catchError(this.handleError<Item>('addItemToContainer'))
    );
  }

  updateContainer(container: Container): Observable<Container> {
    return this.http.post<Container>(this.url, container, httpOptions).pipe(
      tap((response: Container) => this.log(`updated container w/ id=${response.entityID}`)),
      catchError(this.handleError<Container>('updateContainer'))
    );
  }
}
