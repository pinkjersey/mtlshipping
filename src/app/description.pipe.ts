import { Pipe, PipeTransform } from '@angular/core';
import {DesignColor} from './design-detail/design-detail';
import {DescriptionPipeBase} from './descriptionPipeBase';

@Pipe({
  name: 'description'
})
export class DescriptionPipe extends DescriptionPipeBase implements PipeTransform {
  transform(entityID: string, type: string, list: any[]): string {
    const i = DescriptionPipeBase.find(entityID, list);
    if (i == null) {
      console.log(`entity ${entityID} not found`);
      return 'not found!';
    } else {
      if (type === 'DesignColor') {
        return DescriptionPipeBase.describeDesignColor(i);
      } else if (type === 'Vendor') {
        return DescriptionPipeBase.describeVendor(i);
      } else if (type === 'Customer') {
        return DescriptionPipeBase.describeCustomer(i);
      } else if (type === 'Vessel') {
        return DescriptionPipeBase.describeVessel(i)
      }
    }

    return `type ${type} not supported`;
  }

}
