import { Component, OnInit } from '@angular/core';
import {Design} from './design';
import {DesignService} from '../design.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  designs: Design[];
  selectedDesign: Design;

  constructor(private router: Router, private designService: DesignService) { }
  onSelect(design: Design): void {
    this.selectedDesign = design;
  }
  ngOnInit() {
    this.getDesigns()
  }

  gotoDetail(): void {
    this.router.navigate(['/design-detail', this.selectedDesign.entityID])
  }

  getDesigns(): void {
    this.designService.getDesigns()
      .subscribe(designs => this.designs = designs);
  }

  add(designName: string): void {
    designName = designName.trim();
    if (!designName) { return; }
    const v = new Design();
    v.designName = designName;
    v.entityID = '';
    this.designService.addDesign(v)
      .subscribe(design => {
        this.designs.push(design);
      });
  }
}
