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
    this.customerService.getCustomers().then(inputCustomers => this.customers = inputCustomers)
  }
  ngOnInit(): void {
    this.getCustomers();
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCustomer.entityID])
  }
}

