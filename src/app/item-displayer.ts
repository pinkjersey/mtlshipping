import {Component, Input, OnInit} from '@angular/core';
import { DesignService} from './design.service';
import {Design} from './design/design';
import {DesignColor} from './design-detail/design-detail';
import {Customer} from './app.customer';
import {PurchaseOrder} from './purchase-order-detail/purchaseOrder';
import {CustomerService} from './app.customer.service';
import {PurchaseOrderService} from './purchase-order.service';

export class ItemDisplayer  {
  protected allColors: DesignColor[];
  protected designs: Design[];
  protected allCustomers: Customer[];
  protected allPOs: PurchaseOrder[];

  constructor(
    protected designService: DesignService,
    protected customerService: CustomerService,
    protected purchaseOrderService: PurchaseOrderService
  ) { }

  protected initDisplayer() {
    this.getCustomers();
    this.getDesigns();
    this.getAllColors();
    this.getPOs();
  }

  private getAllColors(): void {
    this.designService.getAllColors()
      .subscribe(colors => this.allColors = colors);
  }

  private getDesigns(): void {
    this.designService.getDesigns()
      .subscribe(designs => {
        this.designs = designs;
      });
  }

  private getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(c => this.allCustomers = c);
  }

  private getPOs(): void {
    this.purchaseOrderService.getPOs()
      .subscribe(r => {
        this.allPOs = r;
        console.log('all pos set');
      });
  }
}
