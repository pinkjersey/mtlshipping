import { Component } from '@angular/core';
import { Customer } from './app.customer';
import { CustomerDetailComponent} from './app.customer-detail.component'

const CUSTOMERS: Customer[] = [
  { id: '0-0', name: 'Bobcat'},
  { id: '0-1', name: 'Samcat'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MTL Global Shipping Manager';
  customers = CUSTOMERS;
  selectedCustomer: Customer;
  customer: Customer = {
    id: '0-1',
    name: 'Bobcat'
  };
  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }
}

