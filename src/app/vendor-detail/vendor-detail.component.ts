import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { OurPurchaseOrder} from '../our-purchase-order-detail/ourPurchaseOrder';
import { Vendor } from '../vendor/vendor'
import { VendorService} from '../vendor.service';
import {Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  @Input() vendor: Vendor;
  ourPurchaseOrders: OurPurchaseOrder[];
  selectedOurPurchaseOrder: OurPurchaseOrder;

  constructor(
    private router: Router,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  onSelect(po: OurPurchaseOrder): void {
    this.selectedOurPurchaseOrder = po;
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.vendorService.getVendor(params.get('id')))
      .subscribe(vendor => {
        this.vendor = vendor;
        this.getPurchaseOrders();
      });
  }

  addPurchaseOrder(poID: string): void {
    const rightNow = new Date();
    const res = rightNow.toISOString().slice(0, 10);
    poID = poID.trim();
    if (!poID) { return; }
    const v = new OurPurchaseOrder();
    v.ourPO = poID;
    v.date = res;
    v.entityID = '';
    v.vendorID = this.vendor.entityID;
    this.vendorService.addOurPurchaseOrder(v)
      .subscribe(po => {
        if (po != null) {
          this.ourPurchaseOrders.push(po);
        }
      });
  }
  getPurchaseOrders(): void {
    this.vendorService.getVendorPOs(this.vendor.entityID)
      .subscribe(purchaseOrders => this.ourPurchaseOrders = purchaseOrders);
  }

  gotoDetail(): void {
    this.router.navigate(['/our-purchase-order-detail', this.selectedOurPurchaseOrder.entityID])
  }
}
