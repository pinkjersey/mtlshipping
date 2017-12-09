import {Component, Input, OnInit} from '@angular/core';
import { DesignService} from './design.service';
import {Design} from './design/design';
import {DesignColor} from './design-detail/design-detail';

export class ItemDisplayer  {
  protected allColors: DesignColor[];
  protected designs: Design[];

  constructor(
    protected designService: DesignService
  ) { }

  protected initDisplayer() {
    this.getDesigns();
    this.getAllColors();
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
}
