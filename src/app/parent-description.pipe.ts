import { Pipe, PipeTransform } from '@angular/core';
import {DescriptionPipeBase} from './descriptionPipeBase';

@Pipe({
  name: 'parentDescription'
})
export class ParentDescriptionPipe extends DescriptionPipeBase implements PipeTransform {

  transform(entityID: string, type: string, key: string, childList: any[], parentList: any[]): any {
    const i = this.find(entityID, childList);
    if (i == null) {
      return 'child not found!';
    } else {
      if (type === 'DesignColor') {
        const parent = this.find(i.designID, parentList);
        if (parent == null) {
          return 'parent not found!';
        } else {
          return this.describeDesign(parent);
        }
      }
    }

    return `type ${type} not supported`;
  }

}
