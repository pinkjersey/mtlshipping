import {Component, Input, OnInit} from '@angular/core';
import {Item} from './item';
import {ItemService} from '../item.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ItemDisplayer} from '../item-displayer';
import {DesignService} from '../design.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent extends ItemDisplayer implements OnInit {
  @Input() item: Item;
  orderedYards: number;
  shippedYards: number;
  fob: number;
  ldp: number;
  millETS: string;

  constructor(
    designService: DesignService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super(designService);
    console.log('Base constructed');
  }

  private static get BLANK_DATE(): string { return '1980-01-01'; }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.itemService.getItem(params.get('id')))
      .subscribe(item => {
        this.item = item;
        this.copyItem(item);
      });

    console.log('Calling base init');
    super.initDisplayer();
  }

  copyItem(item: Item): void {
    this.orderedYards = item.orderedYards;
    this.shippedYards = item.shippedYards;
    this.fob = item.fob;
    this.ldp = item.ldp;

    if (item.millETS === ItemDetailsComponent.BLANK_DATE) {
      console.log(`item mill ets blank`);
      this.millETS = '';
    } else {
      console.log(`item mill ets filed in`);
      this.millETS = item.millETS;
    }
  }

  updateItem(): void {
    console.log(`updating item ${this.item.entityID} ${this.millETS}`);

    const item = new Item();
    item.entityID = this.item.entityID;
    item.cancelled = this.item.cancelled;
    item.ourPOID = this.item.entityID;
    item.vendorID = this.item.vendorID;
    item.designColorID = this.item.designColorID;
    item.orderedYards = this.orderedYards;
    item.shippedYards = this.shippedYards;
    item.fob = this.fob;
    item.ldp = this.ldp;
    item.customerPOID = this.item.customerPOID;
    if (this.millETS === '') {
      console.log(`blanking out date`);
      item.millETS = ItemDetailsComponent.BLANK_DATE
    } else {
      item.millETS = this.millETS;
    }

    this.itemService.updateItem(item)
      .subscribe(retItem => {
        if (retItem != null) {
          this.copyItem(retItem);
        }
      })
  }

  goBack(): void {
    this.location.back()
  }
}
