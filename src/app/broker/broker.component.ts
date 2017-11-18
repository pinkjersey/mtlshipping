import { Component, OnInit } from '@angular/core';
import {Broker} from './broker';
import {BrokerService} from '../broker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit {
  brokers: Broker[];
  selectedBroker: Broker;

  constructor(private router: Router, private brokerService: BrokerService) { }

  ngOnInit() {
    this.getBrokers()
  }
  onSelect(broker: Broker): void {
    this.selectedBroker = broker;
  }
  gotoDetail(): void {
    this.router.navigate(['/broker_detail', this.selectedBroker.entityID])
  }
  getBrokers(): void {
    this.brokerService.getBrokers()
      .subscribe(brokers => this.brokers = brokers);
  }
  add(brokerName: string): void {
    brokerName = brokerName.trim();
    if (!brokerName) { return; }
    const b = new Broker();
    b.brokerName = brokerName;
    b.entityID = '';
    this.brokerService.addBroker(b)
      .subscribe(broker => {
        this.brokers.push(broker);
      });
  }
}
