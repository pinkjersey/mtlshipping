import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from './app.customer.service';
import {Customer} from './app.customer';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-customer-detail',
  template: `
    <div *ngIf="customer">
      <h2>{{customer.customerName}} details!</h2>
      <div><label>id: </label>{{customer.entityID}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="customer.customerName" placeholder="name" />
      </div>
    </div>
    <button (click)="goBack()">Back</button>
  `
})

export class CustomerDetailComponent implements OnInit {
  @Input() customer: Customer;
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.customerService.getCustomer(params.get('id')))
      .subscribe(customer => this.customer = customer);
  }
  goBack(): void {
    this.location.back()
  }
}
