import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {VesselService} from '../vessel.service';
import {Vessel} from './vessel';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {
  vesselName: String;
  vessels: Vessel[];
  selectedVessel: Vessel;

  constructor(private router: Router, private vesselService: VesselService) { }

  ngOnInit() {
    this.getVessels();
  }
  onSelect(vessel: Vessel): void {
    this.selectedVessel = vessel;
  }
  getVessels(): void {
    this.vesselService.getVessels()
      .subscribe(vessels => this.vessels = vessels)
  }

  add(): void {
    const vn = this.vesselName.trim();
    if (!vn) { return; }
    const v = new Vessel();
    v.vesselName = vn;
    v.entityID = '';
    this.vesselService.addVessel(v)
      .subscribe(vessel => {
        this.vessels.push(vessel);
      });
  }
}
