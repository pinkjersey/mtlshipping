import { Component, OnInit } from '@angular/core'
import { Customer } from './app.customer'
import { CustomerService } from './app.customer.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './app.dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}
  ngOnInit(): void {
    this.getCustomers()
  }
  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers.slice(1, 5));
  }
}
