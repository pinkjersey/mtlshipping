import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ShipmentTypeService} from '../shipment-type.service';
import {ShipmentType} from './shipment-type';

@Component({
  selector: 'app-shipment-type',
  templateUrl: './shipment-type.component.html',
  styleUrls: ['./shipment-type.component.css']
})
export class ShipmentTypeComponent implements OnInit {
  shipmentType: String;
  shipmentTypes: ShipmentType[];

  constructor(private router: Router, private shipmentTypeService: ShipmentTypeService) { }

  ngOnInit() {
    this.getShipmentTypes();
  }

  getShipmentTypes(): void {
    this.shipmentTypeService.getShipmentTypes()
      .subscribe(shipmentTypes => this.shipmentTypes = shipmentTypes)
  }

  add(): void {
    const st = this.shipmentType.trim();
    if (!st) { return; }
    const localST = new ShipmentType();
    localST.shipmentType = st;
    localST.entityID = '';
    this.shipmentTypeService.addShipmentType(localST)
      .subscribe(shipmentType => {
        this.shipmentTypes.push(shipmentType);
      });
  }
}
