import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Shipment} from '../shipment/shipment';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ShipmentService} from '../shipment.service';
import {ShipmentTypeService} from '../shipment-type.service';
import {ShipmentType} from '../shipment-type/shipment-type';
import {Vessel} from '../vessel/vessel';
import {Broker} from '../broker/broker';
import {VesselService} from '../vessel.service';
import {BrokerService} from '../broker.service';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.css']
})
export class ShipmentDetailComponent implements AfterViewInit {
  @Input() shipment: Shipment;
  @ViewChild('shipmentForm') itemForm: NgForm;
  eta: string;
  vesselID: string;
  status: string;
  shipmentTypeID: string;
  brokerID: string;
  containerName: string;

  // static data
  allShipmentTypes: ShipmentType[];
  allVessels: Vessel[];
  allBrokers: Broker[];

  constructor(
    private shipmentService: ShipmentService,
    private shipmentTypeService: ShipmentTypeService,
    private vesselService: VesselService,
    private brokerService: BrokerService,
    private route: ActivatedRoute,
    // private location: Location
  ) { }

  ngAfterViewInit() {
    console.log('view init');
    this.route.paramMap
      .switchMap((params: ParamMap) => this.shipmentService.getShipment(params.get('id')))
      .subscribe(shipment => {
        this.shipment = shipment;
        this.copyShipment(shipment);
      });

    this.getAllShipmentTypes();
    this.getAllVessels();
    this.getAllBrokers();
  }

  copyShipment(shipment: Shipment): void {
    this.eta = shipment.eta;
    this.vesselID = shipment.vesselID;
    this.status = shipment.status;
    this.shipmentTypeID = shipment.shipmentTypeID;
    this.brokerID = shipment.brokerID;
    this.itemForm.form.markAsPristine()
  }

  private getAllShipmentTypes(): void {
    this.shipmentTypeService.getShipmentTypes()
      .subscribe(shipmentTypes => this.allShipmentTypes = shipmentTypes);
  }

  private getAllVessels(): void {
    this.vesselService.getVessels()
      .subscribe(vessels => this.allVessels = vessels);
  }

  private getAllBrokers(): void {
    this.brokerService.getBrokers()
      .subscribe(brokers => this.allBrokers = brokers);
  }

  updateShipment(): void {
    console.log(`updating shipment ${this.shipment.entityID}`);
    const shipment = new Shipment();
    shipment.entityID = this.shipment.entityID;
    shipment.shipmentTypeID = this.shipmentTypeID;
    shipment.brokerID = this.brokerID;
    shipment.status = this.status;
    shipment.vesselID = this.vesselID;
    shipment.eta = this.eta;
    this.shipmentService.updateShipment(shipment)
      .subscribe(updated => {
        if (updated != null) {
          this.copyShipment(updated);
        }
      })
  }

  createContainer(): void {
    console.log('not yet implemented')
  }
}
