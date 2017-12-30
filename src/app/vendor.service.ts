import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {Vendor} from './vendor/vendor';
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';
import {OurPurchaseOrder} from './our-purchase-order-detail/ourPurchaseOrder';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Item} from './item-details/item';
import {VendorInvoice} from './our-pos/vendor-invoice';
import {Urls} from './urls';
import {UrlsProd} from './urls.prod';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VendorService extends ServiceBase {
  private vendor = new BehaviorSubject<Vendor>(null);
  public vendorStream = this.vendor.asObservable();
  private url = Urls.VENDORS;
  private urlForPurchaseOrders = Urls.OURPURCHASEORDERS;
  private urlForVendorInvoice = Urls.VENDORINVOICES;
  private itemsUrl = Urls.ITEMS;

  constructor(private http: HttpClient,
              messageService: MessageService) {
    super(messageService, 'VendorService');
    if (environment.production) {
      this.url = UrlsProd.VENDORS;
      this.urlForPurchaseOrders = UrlsProd.OURPURCHASEORDERS;
      this.urlForVendorInvoice = UrlsProd.VENDORINVOICES;
      this.itemsUrl = UrlsProd.ITEMS;
    }
  }

  broadcastVendorChange(nv: Vendor) {
    console.log('broadcasting vendor change');
    this.vendor.next(nv);
  }

  /** GET vendors from the server */
  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.url)
      .pipe(
        tap(vendors => this.log(`fetched vendors`)),
        catchError(this.handleError('getVendors', []))
      );
  }

  getVendorInvoice(id: string): Observable<VendorInvoice> {
    const url = `${this.urlForVendorInvoice}/${id}`;
    return this.http.get<VendorInvoice>(url).pipe(
      tap(_ => this.log(`fetched vendor invoice id=${id}`)),
      catchError(this.handleError<VendorInvoice>(`getVendorInvoice id=${id}`))
    );
  }

  getVendorInvoices(id: string): Observable<VendorInvoice[]> {
    const url = `${this.url}/${id}/vendorInvoices`;
    return this.http.get<VendorInvoice[]>(url)
      .pipe(
        tap(invoices => this.log(`fetched vendor invoices`)),
        catchError(this.handleError('getVendorInvoices', []))
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

  getVendorInvoiceItems(id: string): Observable<Item[]> {
    const url = `${this.urlForVendorInvoice}/${id}/items`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(items => this.log(`fetched vendor invoice items`)),
        catchError(this.handleError('getVendorInvoiceItems', []))
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

  getUnassignedVendorInvoiceItems(id: string): Observable<Item[]> {
    const url = `${this.url}/${id}/vendorInvoiceItems`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(designColors => this.log(`fetched vendor unassigned vendor invoice items`)),
        catchError(this.handleError('getUnassignedVendorInvoiceItems', []))
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
    return this.http.put<OurPurchaseOrder>(this.urlForPurchaseOrders, po, httpOptions).pipe(
      tap((response: OurPurchaseOrder) => this.log(`added po  w/ id=${response.entityID}`)),
      catchError(this.handleError<OurPurchaseOrder>('addOurPurchaseOrder'))
    );
  }

  addInvoice(inv: VendorInvoice): Observable<VendorInvoice> {
    console.log(`creating new invoice ${inv.entityID} for vendor ${inv.vendorID}`);
    return this.http.put<VendorInvoice>(this.urlForVendorInvoice, inv, httpOptions).pipe(
      tap((response: VendorInvoice) => this.log(`added vendor invoice w/ id=${response.entityID}`)),
      catchError(this.handleError<VendorInvoice>('addInvoice'))
    );
  }

  addItemToVendorInvoice(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions).pipe(
      tap((response: Item) => this.log(`added item w/ id=${response.entityID} to vendor invoice`)),
      catchError(this.handleError<Item>('addItemToVendorInvoice'))
    );
  }
}
