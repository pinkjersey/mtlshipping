import { Component, OnInit } from '@angular/core';
import {Vessel} from '../vessel/vessel';
import {Broker} from '../broker/broker';
import {ShipmentType} from '../shipment-type/shipment-type';
import {VesselService} from '../vessel.service';
import {BrokerService} from '../broker.service';
import {ShipmentTypeService} from '../shipment-type.service';
import {Shipment} from './shipment';
import {ShipmentService} from '../shipment.service';
import {Router} from "@angular/router";

enum Type { NONE, SUCCESSFUL, WARNING, DANGER }

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {
  // form inputs
  eta: string;
  broker: string;
  vessel: string;
  shipmentType: string;
  // form selectors
  brokers: Broker[];
  vessels: Vessel[];
  shipmentTypes: ShipmentType[];
  // entity data
  selectedShipment: Shipment;
  shipments: Shipment[];
  isWarning = ShipmentComponent.isWarning;
  isDanger = ShipmentComponent.isDanger;
  isSuccesful = ShipmentComponent.isSuccessful;

  static isWarning(shipment: Shipment): boolean {
    return ShipmentComponent.deteremineType(shipment, Type.WARNING)
  }

  static isDanger(shipment: Shipment): boolean {
    return ShipmentComponent.deteremineType(shipment, Type.DANGER)
  }

  static isSuccessful(shipment: Shipment): boolean {
    return ShipmentComponent.deteremineType(shipment, Type.SUCCESSFUL)
  }

  static deteremineType(shipment: Shipment, type: Type): boolean {
    const today = Date.now();
    if (type === Type.WARNING) {
      if (shipment.status === 'S' && today <= Date.parse(shipment.eta)) {
        return true;
      }
    }
    if (type === Type.SUCCESSFUL) {
      if (shipment.status === 'D') {
        return true;
      }
    }
    if (type === Type.DANGER) {
      if (shipment.status === 'S' && today > Date.parse(shipment.eta)) {
        return true;
      }
    }
    if (type === Type.NONE) {
      if (shipment.status === 'C') {
        return true;
      }
    }
    return false;
  }

  constructor(private router: Router, private vesselService: VesselService, private brokerService: BrokerService,
              private shipmentTypeService: ShipmentTypeService,
              private shipmentService: ShipmentService) { }

  ngOnInit() {
    this.getVessels();
    this.getBrokers();
    this.getShipmentTypes();
    this.getShipments()
  }

  onSelect(shipment: Shipment): void {
    this.selectedShipment = shipment;
  }

  getVessels(): void {
    this.vesselService.getVessels()
      .subscribe(vessels => this.vessels = vessels)
  }

  getBrokers(): void {
    this.brokerService.getBrokers()
      .subscribe(brokers => this.brokers = brokers)
  }

  getShipmentTypes(): void {
    this.shipmentTypeService.getShipmentTypes()
      .subscribe(shipmentTypes => this.shipmentTypes = shipmentTypes)
  }

  getShipments(): void {
    this.shipmentService.getShipments()
      .subscribe(shipments => this.shipments = shipments)
  }

  createShipment(): void {
    console.log(`creating shipment ${this.eta} ${this.broker} ${this.vessel} ${this.shipmentType}`);

    const shipment = new Shipment();
    shipment.entityID = '';
    shipment.eta = this.eta;
    shipment.brokerID = this.broker;
    shipment.shipmentTypeID = this.shipmentType;
    shipment.vesselID = this.vessel;
    shipment.status = 'S'; // shipped

    console.log('calling addShipment');
    this.shipmentService.addShipment(shipment)
      .subscribe(retItem => {
        this.shipments.push(retItem);
      })
  }

  gotoDetail(): void {
    this.router.navigate(['/shipment-detail', this.selectedShipment.entityID])
  }
}
