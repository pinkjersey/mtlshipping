import {Component, Input, OnInit} from '@angular/core';
import {VendorInvoice} from '../our-pos/vendor-invoice';
import {Vendor} from '../vendor/vendor';
import {Item} from '../item-details/item';
import {ItemDisplayer} from '../item-displayer';
import {Location} from '@angular/common';
import {VendorService} from '../vendor.service';
import {PurchaseOrderService} from '../purchase-order.service';
import {DesignService} from '../design.service';
import {CustomerService} from '../app.customer.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Design} from '../design/design';
import {DesignColor} from '../design-detail/design-detail';

@Component({
  selector: 'app-vendor-invoice-detail',
  templateUrl: './vendor-invoice-detail.component.html',
  styleUrls: ['./vendor-invoice-detail.component.css']
})
export class VendorInvoiceDetailComponent extends ItemDisplayer implements OnInit {
  @Input() vendorInvoice: VendorInvoice;
  items: Item[];
  unassignedItems: Item[];
  selectedItem: string;
  selectedAddedItem: Item;
  vendor: Vendor;
  invDate: string;
  designID: String;
  colors: DesignColor[];
  shippedYards: number;
  warnItem = VendorInvoiceDetailComponent.warnItem;

  static warnItem(item: Item): boolean {
    return item.shippedYards === 0;
  }

  constructor(private router: Router,
              purchaseOrderService: PurchaseOrderService,
              designService: DesignService,
              private vendorService: VendorService,
              customerService: CustomerService,
              private route: ActivatedRoute,
              private location: Location) { super(designService, customerService, purchaseOrderService);
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.vendorService.getVendorInvoice(params.get('id')))
      .subscribe(inv => {
        this.vendorInvoice = inv;
        this.invDate = inv.invoiceDate;
        this.getItems();
        this.getVendor();
        this.getUnassignedItems();
      });

    super.initDisplayer();
  }

  getItems(): void {
    console.log('VendorInvoiceDetailComponent getting vendor invoice items items');
    this.vendorService.getVendorInvoiceItems(this.vendorInvoice.entityID)
      .subscribe(items => this.items = items);
  }

  getVendor(): void {
    this.vendorService.getVendor(this.vendorInvoice.vendorID)
      .subscribe(vendor => this.vendor = vendor);
  }

  getUnassignedItems(): void {
    console.log('getting unassigned items');
    this.vendorService.getUnassignedVendorInvoiceItems(this.vendorInvoice.vendorID)
      .subscribe(unassignedItems => this.unassignedItems = unassignedItems);
  }



  addItem(): void {
    console.log(`updating item ${this.selectedItem}`);
    const selectedItem = this.unassignedItems.find(x => x.entityID === this.selectedItem);

    const item = new Item();
    item.entityID = selectedItem.entityID;
    item.cancelled = selectedItem.cancelled;
    item.ourPOID = selectedItem.entityID;
    item.vendorInvoiceID = this.vendorInvoice.entityID;
    item.vendorID = selectedItem.vendorID;
    item.designColorID = selectedItem.designColorID;
    item.orderedYards = selectedItem.orderedYards;
    item.shippedYards = this.shippedYards;
    item.fob = selectedItem.shippedYards;
    item.ldp = selectedItem.ldp;
    item.customerPOID = selectedItem.customerPOID;
    item.millETS = selectedItem.millETS;

    this.vendorService.addItemToVendorInvoice(item)
      .subscribe(retItem => {
        if (retItem != null) {
          this.items.push(retItem);
          this.getUnassignedItems();
          this.selectedItem = null;
        }
      })
  }
}
