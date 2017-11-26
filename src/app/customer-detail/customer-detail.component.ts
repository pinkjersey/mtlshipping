import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { PurchaseOrder} from '../purchase-order-detail/purchaseOrder';
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
  purchaseOrders: PurchaseOrder[];
  selectedPurchaseOrder: PurchaseOrder;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  onSelect(po: PurchaseOrder): void {
    this.selectedPurchaseOrder = po;
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.customerService.getCustomer(params.get('id')))
      .subscribe(customer => {
        this.customer = customer;
        this.getPurchaseOrders();
      });
  }

  goBack(): void {
    this.location.back()
  }

  addPurchaseOrder(poID: string): void {
    const rightNow = new Date();
    const res = rightNow.toISOString().slice(0, 10);
    poID = poID.trim();
    if (!poID) { return; }
    const v = new PurchaseOrder();
    v.customerPO = poID;
    v.date = res;
    v.entityID = '';
    v.customerID = this.customer.entityID;
    this.customerService.addPurchaseOrder(v)
      .subscribe(po => {
        if (po != null) {
          this.purchaseOrders.push(po);
        }
      });
  }

  getPurchaseOrders(): void {
    this.customerService.getCustomerPOs(this.customer.entityID)
      .subscribe(purchaseOrders => this.purchaseOrders = purchaseOrders);
  }

  gotoDetail(): void {
    this.router.navigate(['/purchase-order-detail', this.selectedPurchaseOrder.entityID])
  }
}
