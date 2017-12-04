import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from '../app.customer';
import {CustomerService} from '../app.customer.service';
import {Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() customer: Customer;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.customerService.getCustomer(params.get('id')))
      .subscribe(customer => {
        this.customer = customer;
        this.customerService.broadcastCustomerChange(customer)
      });
  }
}
