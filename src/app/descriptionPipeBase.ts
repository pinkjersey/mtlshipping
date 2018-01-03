import {DesignColor} from './design-detail/design-detail';
import {Design} from './design/design';
import {Vendor} from './vendor/vendor';
import {Customer} from './app.customer';
import {Vessel} from './vessel/vessel';
import {PurchaseOrder} from "./purchase-order-detail/purchaseOrder";

export class DescriptionPipeBase {
  static find(entityID: string, list: any[]): any {
    for (const i of list) {
      if (i.entityID === entityID) {
        return i;
      }
    }
    return null;
  }

  static describeDesignColor(i: DesignColor): string {
    return i.color;
  }

  static describeDesign(i: Design): string {
    return i.designName
  }

  static describeVendor(i: Vendor): string {
    return i.vendorName
  }

  static describeCustomer(i: Customer): string {
    return i.customerName;
  }

  static describeVessel(i: Vessel): string {
    return i.vesselName;
  }

  static describeCustomerPO(i: PurchaseOrder): string {
    return i.customerPO;
  }
}
