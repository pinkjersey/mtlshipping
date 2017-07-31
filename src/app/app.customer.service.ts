import { Injectable } from '@angular/core';
import { Customer} from './app.customer';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {
  constructor(private http: Http) {}
  getCustomers(): Promise<Customer[]> {
    return this.http.get('http://localhost:8080/customers').toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }
  getCustomer(id: string): Promise<Customer> {
    return this.http.get('http://localhost:8080/customers/' + id).toPromise()
      .then(response => response.json() as Customer)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred while getting customers: ', error);
    return Promise.reject(error.message || error);
  }
}
