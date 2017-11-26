import {DesignColor} from './design-detail/design-detail';
import {Design} from './design/design';

export class DescriptionPipeBase {
  find(entityID: string, list: any[]): any {
    for (const i of list) {
      if (i.entityID === entityID) {
        return i;
      }
    }
    return null;
  }

  describeDesignColor(i: DesignColor): string {
    return i.color;
  }

  describeDesign(i: Design): string {
    return i.designName
  }
}
