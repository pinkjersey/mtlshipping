import { Pipe, PipeTransform } from '@angular/core';
import {DesignColor} from './design-detail/design-detail';
import {DescriptionPipeBase} from './descriptionPipeBase';

@Pipe({
  name: 'description'
})
export class DescriptionPipe extends DescriptionPipeBase implements PipeTransform {
  transform(entityID: string, type: string, list: any[]): string {
    const i = this.find(entityID, list);
    if (i == null) {
      return 'not found!';
    } else {
      if (type === 'DesignColor') {
        return this.describeDesignColor(i);
      }
    }

    return `type ${type} not supported`;
  }

}
