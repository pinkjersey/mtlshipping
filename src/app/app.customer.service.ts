import { Injectable } from '@angular/core';
import { Customer} from './app.customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { ServiceBase } from './serviceBase'
import {PurchaseOrder} from './purchase-order-detail/purchaseOrder';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Urls} from './urls';
import {UrlsProd} from './urls.prod';
import {environment} from '../environments/environment';
import {OurInvoice} from "./our-invoices/ourInvoice";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService extends ServiceBase {
  private customer = new BehaviorSubject<Customer>(null);
  public customerStream = this.customer.asObservable();
  private customerUrl = Urls.CUSTOMERS;
  private urlForPurchaseOrders = Urls.PURCHASEORDERS;
  private urlForOurInvoices = Urls.OURINVOICES;
  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'CustomerService');
    if (environment.production) {
      this.customerUrl = UrlsProd.CUSTOMERS;
      this.urlForPurchaseOrders = UrlsProd.PURCHASEORDERS;
      this.urlForOurInvoices = UrlsProd.OURINVOICES;
    }
  }

  broadcastCustomerChange(nc: Customer) {
    console.log('broadcasting customer change');
    this.customer.next(nc);
  }

  /** GET customers from the server */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl)
      .pipe(
        tap(c => this.log(`fetched customers`)),
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomerPOs(id: string): Observable<PurchaseOrder[]> {
    const url = `${this.customerUrl}/${id}/purchaseOrders`;
    return this.http.get<PurchaseOrder[]>(url)
      .pipe(
        tap(designColors => this.log(`fetched customer purchase orders`)),
        catchError(this.handleError('getCustomerPOs', []))
      );
  }

  getCustomerOurInvoices(id: string): Observable<OurInvoice[]> {
    const url = `${this.customerUrl}/${id}/invoices`;
    return this.http.get<OurInvoice[]>(url)
      .pipe(
        tap(designColors => this.log(`fetched customer invoices`)),
        catchError(this.handleError('getCustomerOurInvoices', []))
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

  addPurchaseOrder(po: PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.urlForPurchaseOrders, po, httpOptions).pipe(
      tap((response: PurchaseOrder) => this.log(`added po  w/ id=${response.entityID}`)),
      catchError(this.handleError<PurchaseOrder>('addPurchaseOrder'))
    );
  }

  addInvoice(inv: OurInvoice): Observable<OurInvoice> {
    return this.http.put<OurInvoice>(this.urlForOurInvoices, inv, httpOptions).pipe(
      tap((response: OurInvoice) => this.log(`added inv w/ id=${response.entityID}`)),
      catchError(this.handleError<OurInvoice>('addInvoice'))
    );
  }
}
