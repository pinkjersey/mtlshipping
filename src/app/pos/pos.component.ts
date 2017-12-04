import { Component, OnInit } from '@angular/core';
import { PurchaseOrder} from '../purchase-order-detail/purchaseOrder';
import { Customer } from '../app.customer';
import {CustomerService} from '../app.customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  customer: Customer;
  purchaseOrders: PurchaseOrder[];
  selectedPurchaseOrder: PurchaseOrder;

  constructor(
    private router: Router,
    private customerService: CustomerService) {
    this.customerService.customerStream.subscribe(
      c => {
        this.customer = c;
        this.getPurchaseOrders();
      }
    )
  }

  onSelect(po: PurchaseOrder): void {
    this.selectedPurchaseOrder = po;
  }

  ngOnInit() {
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
    const lastSlash = this.router.url.lastIndexOf('/');
    const url = this.router.url.substring(0, lastSlash);
    const add = '/purchase-order-detail';
    console.log(url + add);
    this.router.navigate([url + add, this.selectedPurchaseOrder.entityID]);
  }
}
