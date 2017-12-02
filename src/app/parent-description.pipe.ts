import { Pipe, PipeTransform } from '@angular/core';
import {DescriptionPipeBase} from './descriptionPipeBase';

@Pipe({
  name: 'parentDescription'
})
export class ParentDescriptionPipe extends DescriptionPipeBase implements PipeTransform {

  transform(entityID: string, type: string, key: string, childList: any[], parentList: any[]): any {
    if (childList == null) {
      return 'null child list';
    }
    if (parentList == null) {
      return 'null parent list';
    }

    const i = DescriptionPipeBase.find(entityID, childList);
    if (i == null) {
      return 'child not found!';
    } else {
      if (type === 'DesignColor') {
        const parent = DescriptionPipeBase.find(i.designID, parentList);
        if (parent == null) {
          return 'parent not found!';
        } else {
          return DescriptionPipeBase.describeDesign(parent);
        }
      } else if (type === 'PurchaseOrder') {
        const parent = DescriptionPipeBase.find(i.customerID, parentList);
        if (parent == null) {
          return 'parent not found!';
        } else {
          return DescriptionPipeBase.describeCustomer(parent);
        }
      }
    }

    return `type ${type} not supported`;
  }

}
