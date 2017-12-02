import { Component, OnInit } from '@angular/core';
import {Vendor} from './vendor';
import {VendorService} from '../vendor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendors: Vendor[];
  selectedVendor: Vendor;

  constructor(private router: Router, private vendorService: VendorService) { }
  onSelect(vendor: Vendor): void {
    this.selectedVendor = vendor;
  }
  ngOnInit() {
    this.getVendors()
  }
  getVendors(): void {
    this.vendorService.getVendors()
      .subscribe(vendors => this.vendors = vendors);
  }

  gotoDetail(): void {
    this.router.navigate(['/vendor-detail', this.selectedVendor.entityID])
  }

  add(vendorName: string): void {
    vendorName = vendorName.trim();
    if (!vendorName) { return; }
    const v = new Vendor();
    v.vendorName = vendorName;
    v.entityID = '';
    this.vendorService.addVendor(v)
      .subscribe(vendor => {
        this.vendors.push(vendor);
      });
  }
}
