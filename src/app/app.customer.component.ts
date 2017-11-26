import { Component, OnInit } from '@angular/core';
import { Customer } from './app.customer';
import { CustomerService } from './app.customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './app.customer.component.html',
  styleUrls: ['./app.customer.component.css']
})
export class CustomersComponent implements OnInit {
  title = 'MTL Global Shipping Manager';
  customers: Customer[];
  selectedCustomer: Customer;
  constructor(private router: Router, private customerService: CustomerService) {}
  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }
  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }
  ngOnInit(): void {
    this.getCustomers();
  }
  gotoDetail(): void {
    this.router.navigate(['/customer-detail', this.selectedCustomer.entityID])
  }
  add(customerName: string): void {
    customerName = customerName.trim();
    if (!customerName) { return; }
    const c = new Customer();
    c.customerName = customerName;
    c.entityID = '';
    this.customerService.addCustomer(c)
      .subscribe(customer => {
        this.customers.push(customer);
      });
  }
}

