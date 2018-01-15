import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ItemDisplayer} from '../item-displayer';
import {Container} from './container';
import { DesignService} from '../design.service';
import { PurchaseOrderService} from '../purchase-order.service';
import {CustomerService} from '../app.customer.service';
import {Item} from '../item-details/item';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ContainerService} from '../container.service';
import {ItemService} from '../item.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-container-detail',
  templateUrl: './container-detail.component.html',
  styleUrls: ['./container-detail.component.css']
})
export class ContainerDetailComponent extends ItemDisplayer implements OnInit {
  @Input() container: Container;
  @ViewChild('containerForm') containerForm: NgForm;
  containerType: string;
  items: Item[];
  readyToShipItems: Item[];
  readyToShipItem: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private containerService: ContainerService,
    private itemService: ItemService,
    purchaseOrderService: PurchaseOrderService,
    designService: DesignService,
    customerService: CustomerService) { super(designService, customerService, purchaseOrderService); }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.containerService.getContainer(params.get('id')))
      .subscribe(container => {
        this.container = container;
        this.containerType = container.containerType;
        this.getItems();
        this.getReadyToShipItems();
      });

    super.initDisplayer();
  }

  getItems(): void {
    console.log('ContainerDetailComponent getting container items');
    this.containerService.getContainerItems(this.container.entityID)
      .subscribe(items => this.items = items);
  }

  getReadyToShipItems(): void {
    console.log('ContainerDetailComponent getting items ready to ship');
    this.itemService.getReadyToShipItems()
      .subscribe(items => this.readyToShipItems = items);
  }

  updateContainer(): void {
    const updated = new Container();
    updated.entityID = this.container.entityID;
    updated.containerName = this.container.containerName;
    updated.containerType = this.containerType;
    updated.shipmentID = this.container.shipmentID;

    this.containerService.updateContainer(updated)
      .subscribe(updatedContainer => {
        if (updatedContainer != null) {
          this.container = updatedContainer;
          this.containerType = updatedContainer.containerType;
          this.containerForm.form.markAsPristine();
        }
      })
  }

  addItem(): void {
    console.log(`updating item ${this.readyToShipItem} adding to container ${this.container.entityID}`);
    const selectedItem = this.readyToShipItems.find(x => x.entityID === this.readyToShipItem);

    const item = new Item();
    item.entityID = selectedItem.entityID;
    item.cancelled = selectedItem.cancelled;
    item.ourPOID = selectedItem.entityID;
    item.vendorInvoiceID = selectedItem.entityID;
    item.vendorID = selectedItem.vendorID;
    item.designColorID = selectedItem.designColorID;
    item.orderedYards = selectedItem.orderedYards;
    item.shippedYards = selectedItem.shippedYards;
    item.fob = selectedItem.shippedYards;
    item.ldp = selectedItem.ldp;
    item.customerPOID = selectedItem.customerPOID;
    item.millETS = selectedItem.millETS;
    item.containerID = this.container.entityID;

    this.containerService.addItemToContainer(item)
      .subscribe(retItem => {
        if (retItem != null) {
          this.items.push(retItem);
          this.getReadyToShipItems();
          this.readyToShipItem = null;
        }
      })
  }
}
