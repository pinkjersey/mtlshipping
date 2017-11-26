import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import { PurchaseOrderService} from '../purchase-order.service';
import {PurchaseOrder} from './purchaseOrder';
import {Design} from '../design/design';
import {DesignService} from '../design.service';
import {Item} from './item';
import 'rxjs/add/operator/switchMap';
import {DesignColor} from '../design-detail/design-detail';
import {Vendor} from '../vendor/vendor';
import {VendorService} from '../vendor.service';



@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {
  @Input() purchaseOrder: PurchaseOrder;
  @Input() designs: Design[];
  @Input() vendors: Vendor[];
  colors: DesignColor[];
  allColors: DesignColor[];
  @Input() designID: string;
  items: Item[];
  selectedDesignColor: string;
  selectedVendor: string;
  orderedYards: number;
  LDP: number;

  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private designService: DesignService,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.purchaseOrderService.getPO(params.get('id')))
      .subscribe(po => {
        this.purchaseOrder = po;
        this.getItems();
      });

    this.getDesigns();
    this.getVendors();
    this.getAllColors();
  }

  getAllColors(): void {
    this.designService.getAllColors()
      .subscribe(colors => this.allColors = colors);
  }

  getColors(event): void {
    this.designID = event.target.value;
    this.getColorsWithID(this.designID);
  }

  getItems(): void {
    this.purchaseOrderService.getPOItems(this.purchaseOrder.entityID)
      .subscribe(items => this.items = items);
  }

  getColorsWithID(entityID): void {
    this.designService.getDesignColors(entityID)
      .subscribe(colors => this.colors = colors);
  }

  getDesigns(): void {
    this.designService.getDesigns()
      .subscribe(designs => {
        this.designs = designs;
        if (designs.length > 0) {
          this.designID = this.designs[0].entityID;
          this.getColorsWithID(this.designID);
        }
      });
  }

  getVendors(): void {
    this.vendorService.getVendors()
      .subscribe(vendors => {
        this.vendors = vendors;
      });
  }

  addItem(): void {
    // TODO add checks here
    const item = new Item();
    item.entityID = ''; // assigned by the back end
    item.cancelled = false;
    item.poNum = ''; // our PO is unassigned
    item.vendorID = this.selectedVendor;
    item.designColorID = this.selectedDesignColor;
    item.orderedYards = this.orderedYards;
    item.shippedYards = 0.0;
    item.fob = 0; // this gets set when our PO is created
    item.ldp = this.LDP;
    item.customerPOID = this.purchaseOrder.entityID;
    item.millETS = '1980-01-01'; // means not set

    console.log('design id ' + item.designColorID);
    console.log('PO id ' + item.customerPOID);
    console.log('vendor id ' + item.vendorID);

    this.purchaseOrderService.addItemToPO(item)
      .subscribe(retItem => {
        if (retItem != null) {
          this.items.push(retItem);
        }
      })
  }
}
