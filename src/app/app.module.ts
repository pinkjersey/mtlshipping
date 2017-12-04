import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { CustomersComponent } from './app.customer.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {DashboardComponent} from './app.dashboard.component';
import {CustomerService} from './app.customer.service';
import { MessageService } from './message.service';
import { BrokerComponent } from './broker/broker.component';
import {BrokerService} from './broker.service';
import { VendorComponent } from './vendor/vendor.component';
import {VendorService} from './vendor.service';
import { DesignComponent } from './design/design.component';
import {DesignService} from './design.service';
import { DesignDetailComponent } from './design-detail/design-detail.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import {PurchaseOrderService} from './purchase-order.service';
import { DescriptionPipe } from './description.pipe';
import { ParentDescriptionPipe } from './parent-description.pipe';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { OurPurchaseOrderDetailComponent } from './our-purchase-order-detail/our-purchase-order-detail.component';
import { OurPosComponent } from './our-pos/our-pos.component';
import { VendorInvoicesComponent } from './vendor-invoices/vendor-invoices.component';
import { PosComponent } from './pos/pos.component';
import { OurInvoicesComponent } from './our-invoices/our-invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailComponent,
    DashboardComponent,
    BrokerComponent,
    VendorComponent,
    DesignComponent,
    DesignDetailComponent,
    PurchaseOrderDetailComponent,
    DescriptionPipe,
    ParentDescriptionPipe,
    VendorDetailComponent,
    OurPurchaseOrderDetailComponent,
    OurPosComponent,
    VendorInvoicesComponent,
    PosComponent,
    OurInvoicesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'designs',
        component: DesignComponent
      },
      {
        path: 'design-detail/:id',
        component: DesignDetailComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customer-detail/:id',
        component: CustomerDetailComponent,
        children: [
          { path: '', redirectTo: 'POs', pathMatch: 'full' },
          { path: 'POs', component: PosComponent },
          { path: 'ourInvoices', component: OurInvoicesComponent },
          { path: 'purchase-order-detail/:id', component: PurchaseOrderDetailComponent }
        ]
      },
      {
        path: 'vendors',
        component: VendorComponent
      },
      {
        path: 'vendor-detail/:id',
        component: VendorDetailComponent,
        children: [
          { path: '', redirectTo: 'ourPOs', pathMatch: 'full' },
          { path: 'ourPOs', component: OurPosComponent },
          { path: 'vendorInvoices', component: VendorInvoicesComponent },
          { path: 'our-purchase-order-detail/:id', component: OurPurchaseOrderDetailComponent }
        ]
      },
      {
        path: 'brokers',
        component: BrokerComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ])
  ],
  providers: [CustomerService, MessageService, BrokerService, VendorService,
  DesignService, PurchaseOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
