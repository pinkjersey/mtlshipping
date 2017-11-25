import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { DesignService } from '../design.service';
import { Design } from '../design/design';
import {DesignColor} from "./design-detail";

@Component({
  selector: 'app-design-detail',
  templateUrl: './design-detail.component.html',
  styleUrls: ['./design-detail.component.css']
})
export class DesignDetailComponent implements OnInit {
  @Input() design: Design;
  colors: DesignColor[];
  constructor(
    private designService: DesignService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.designService.getDesign(params.get('id')))
      .subscribe(design => {
        this.design = design;
        this.getColors();
      });
  }

  goBack(): void {
    this.location.back()
  }

  getColors(): void {
    this.designService.getDesignColors(this.design.entityID)
      .subscribe(colors => this.colors = colors);
  }

  add(colorName: string): void {
    colorName = colorName.trim();
    if (!colorName) { return; }
    const v = new DesignColor();
    v.color = colorName;
    v.entityID = '';
    v.designID = this.design.entityID;
    this.designService.addDesignColor(v)
      .subscribe(designColor => {
        this.colors.push(designColor);
      });
  }
}
