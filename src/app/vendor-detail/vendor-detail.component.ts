import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
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

  constructor(
    private router: Router,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.vendorService.getVendor(params.get('id')))
      .subscribe(vendor => {
        this.vendor = vendor;
        this.vendorService.broadcastVendorChange(vendor)
      });
  }


}
