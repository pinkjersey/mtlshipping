import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {Observable} from 'rxjs/Observable';
import {Vendor} from './vendor/vendor';
import {catchError, tap} from 'rxjs/operators';
import {ServiceBase} from './serviceBase';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VendorService extends ServiceBase {
  private url = 'http://localhost:8080/vendors';  // URL to web ap
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
  addVendor (vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.url, vendor, httpOptions).pipe(
      tap((vendorResponse: Vendor) => this.log(`added vendor w/ id=${vendorResponse.entityID}`)),
      catchError(this.handleError<Vendor>('addVendor'))
    );
  }
}
