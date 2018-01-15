import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import { PurchaseOrderService} from '../purchase-order.service';
import { VendorService} from '../vendor.service';
import { DesignService} from '../design.service';
import {OurPurchaseOrder} from './ourPurchaseOrder';
import {Item} from '../item-details/item';
import 'rxjs/add/operator/switchMap';
import {Vendor} from '../vendor/vendor';
import {CustomerService} from '../app.customer.service';

import {ItemDisplayer} from '../item-displayer';

@Component({
  selector: 'app-our-purchase-order-detail',
  templateUrl: './our-purchase-order-detail.component.html',
  styleUrls: ['./our-purchase-order-detail.component.css']
})
export class OurPurchaseOrderDetailComponent extends ItemDisplayer implements OnInit {
  @Input() ourPurchaseOrder: OurPurchaseOrder;
  items: Item[];
  vendor: Vendor;
  unassignedItems: Item[];
  selectedItem: string;
  selectedAddedItem: Item;
  FOB: number;
  poDate: string;
  warnItem = OurPurchaseOrderDetailComponent.warnItem;

  static warnItem(item: Item): boolean {
    return item.millETS === OurPurchaseOrderDetailComponent.BLANK_DATE;
  }

  constructor(
    private router: Router,
    purchaseOrderService: PurchaseOrderService,
    designService: DesignService,
    private vendorService: VendorService,
    customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) { super(designService, customerService, purchaseOrderService); }

  private static get BLANK_DATE(): string { return '1980-01-01'; }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.purchaseOrderService.getOurPO(params.get('id')))
      .subscribe(po => {
        this.ourPurchaseOrder = po;
        this.poDate = po.date;
        this.getItems();
        this.getVendor();
        this.getUnassignedItems();
      });

    super.initDisplayer();
  }

  onSelect(item: Item): void {
    this.selectedAddedItem = item;
  }



  getItems(): void {
    console.log('OurPurchaseOrderDetailComponent getting our PO items');
    this.purchaseOrderService.getOurPOItems(this.ourPurchaseOrder.entityID)
      .subscribe(items => this.items = items);
  }

  getVendor(): void {
    this.vendorService.getVendor(this.ourPurchaseOrder.vendorID)
      .subscribe(vendor => this.vendor = vendor);
  }

  getUnassignedItems(): void {
    console.log('getting unassigned items');
    this.vendorService.getUnassignedItems(this.ourPurchaseOrder.vendorID)
      .subscribe(unassignedItems => this.unassignedItems = unassignedItems);
  }

  updateDate(): void {
    const updatedPO = new OurPurchaseOrder();
    updatedPO.entityID = this.ourPurchaseOrder.entityID;
    updatedPO.vendorID = this.ourPurchaseOrder.vendorID;
    updatedPO.ourPO = this.ourPurchaseOrder.ourPO;
    updatedPO.date = this.poDate;

    this.purchaseOrderService.updateOurPurchaseOrder(updatedPO)
      .subscribe(retItem => {
        if (retItem != null) {
          console.log(`${retItem.date} ${this.poDate}`);
          this.ourPurchaseOrder.date = retItem.date;
          this.poDate = retItem.date;
        }
      })
  }

  gotoItem(): void {
    this.router.navigate(['/item-detail', this.selectedAddedItem.entityID])
  }

  updateItem(): void {
    console.log(`updating item ${this.selectedItem}`);
    const selectedItem = this.unassignedItems.find(x => x.entityID === this.selectedItem);

    const item = new Item();
    item.entityID = selectedItem.entityID;
    item.cancelled = selectedItem.cancelled;
    item.ourPOID = this.ourPurchaseOrder.entityID;
    item.vendorInvoiceID = selectedItem.vendorInvoiceID;
    item.vendorID = selectedItem.vendorID;
    item.designColorID = selectedItem.designColorID;
    item.orderedYards = selectedItem.orderedYards;
    item.shippedYards = selectedItem.shippedYards;
    item.fob = this.FOB;
    item.ldp = selectedItem.ldp;
    item.customerPOID = selectedItem.customerPOID;
    item.millETS = selectedItem.millETS;

    this.purchaseOrderService.addItemToOurPO(item)
      .subscribe(retItem => {
        if (retItem != null) {
          this.items.push(retItem);
          this.getUnassignedItems();
          this.selectedItem = null;
        }
      })
  }


}
