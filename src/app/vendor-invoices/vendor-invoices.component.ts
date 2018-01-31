import { Component, OnInit } from '@angular/core';
import {Vendor} from '../vendor/vendor';
import {VendorService} from '../vendor.service';
import {Router} from '@angular/router';
import {VendorInvoice} from '../vendor-invoice-detail/vendor-invoice';
import {PurchaseOrder} from "../purchase-order-detail/purchaseOrder";

@Component({
  selector: 'app-vendor-invoices',
  templateUrl: './vendor-invoices.component.html',
  styleUrls: ['./vendor-invoices.component.css']
})
export class VendorInvoicesComponent implements OnInit {
  vendor: Vendor;
  invoiceID: string;
  vendorInvoices: VendorInvoice[];
  selectedVendorInvoice: VendorInvoice;

  constructor(
    private router: Router,
    private vendorService: VendorService) {
    this.vendorInvoices = [];
    this.vendorService.vendorStream.subscribe(
      v => {
        this.vendor = v;
        this.getInvoices();
      }
    )
  }

  ngOnInit() {
  }

  onSelect(inv: VendorInvoice): void {
    this.selectedVendorInvoice = inv;
  }

  getInvoices(): void {
    this.vendorService.getVendorInvoices(this.vendor.entityID)
      .subscribe(invoices => this.vendorInvoices = invoices);
  }

  createInvoice(): void {
    const rightNow = new Date();
    const res = rightNow.toISOString().slice(0, 10);
    const iID = this.invoiceID.trim();
    if (!iID) { return; }
    const i = new VendorInvoice();
    i.invoiceID = this.invoiceID;
    i.invoiceDate = res;
    i.entityID = '';
    i.vendorID = this.vendor.entityID;
    this.invoiceID = '';
    this.vendorService.addInvoice(i)
      .subscribe(inv => {
        if (inv != null) {
          this.vendorInvoices.push(inv);
        }
      });
  }

  gotoDetail(): void {
    const lastSlash = this.router.url.lastIndexOf('/');
    const url = this.router.url.substring(0, lastSlash);
    const add = '/vendor-invoice-detail';
    console.log(url + add);
    this.router.navigate([url + add, this.selectedVendorInvoice.entityID]);
  }
}
