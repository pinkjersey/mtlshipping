import {Component, Host, Input, OnInit} from '@angular/core';
import {Vendor} from '../vendor/vendor';
import {VendorService} from '../vendor.service';
import {OurPurchaseOrder} from '../our-purchase-order-detail/ourPurchaseOrder';
import {Router} from '@angular/router';

@Component({
  selector: 'app-our-pos',
  templateUrl: './our-pos.component.html',
  styleUrls: ['./our-pos.component.css']
})
export class OurPosComponent implements OnInit {
  vendor: Vendor;
  ourPurchaseOrders: OurPurchaseOrder[];
  selectedOurPurchaseOrder: OurPurchaseOrder;

  constructor(
    private router: Router,
    private vendorService: VendorService) {
    this.vendorService.vendorStream.subscribe(
      v => {
        this.vendor = v;
        this.getPurchaseOrders();
      }
    )
  }

  ngOnInit() {
  }

  onSelect(po: OurPurchaseOrder): void {
    this.selectedOurPurchaseOrder = po;
  }
  getPurchaseOrders(): void {
    this.vendorService.getVendorPOs(this.vendor.entityID)
      .subscribe(purchaseOrders => this.ourPurchaseOrders = purchaseOrders);
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


  gotoDetail(): void {
    const lastSlash = this.router.url.lastIndexOf("/");
    const url = this.router.url.substring(0, lastSlash)
    const add = '/our-purchase-order-detail';
    console.log(url + add);
    this.router.navigate([url + add, this.selectedOurPurchaseOrder.entityID])
  }
}
