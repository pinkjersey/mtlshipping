import { Injectable } from '@angular/core';
import { Customer} from './app.customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { ServiceBase } from './serviceBase'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService extends ServiceBase {
  private customerUrl = 'http://localhost:8080/customers';  // URL to web api
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'CustomerService');
  }

  /** GET customers from the server */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl)
      .pipe(
        tap(heroes => this.log(`fetched customers`)),
        catchError(this.handleError('getCustomers', []))
      );
  }
  /** GET customer by id. Will 404 if id not found */
  getCustomer(id: string): Observable<Customer> {
    const url = `${this.customerUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }
  addCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customer, httpOptions).pipe(
      tap((customerResponse: Customer) => this.log(`added customer w/ id=${customerResponse.entityID}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }
}
