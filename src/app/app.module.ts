import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
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
import {ItemService} from './item.service';
import {VesselService} from './vessel.service'
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
import { ItemDetailsComponent } from './item-details/item-details.component';
import { VendorInvoiceDetailComponent } from './vendor-invoice-detail/vendor-invoice-detail.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { VesselComponent } from './vessel/vessel.component';
import { ShipmentTypeComponent } from './shipment-type/shipment-type.component';
import {ShipmentTypeService} from './shipment-type.service';
import {ShipmentService} from './shipment.service';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';
import { LoginComponent } from './login/login.component';
import {LoginService} from './login.service';
import {TokenInterceptor} from './token.interceptor';
import {AuthService} from './auth.service';
import { ContainerDetailComponent } from './container-detail/container-detail.component';
import {ContainerService} from './container.service';

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
    OurInvoicesComponent,
    ItemDetailsComponent,
    VendorInvoiceDetailComponent,
    ShipmentComponent,
    VesselComponent,
    ShipmentTypeComponent,
    ShipmentDetailComponent,
    LoginComponent,
    ContainerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
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
        path: 'item-detail/:id',
        component: ItemDetailsComponent
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
          { path: 'our-purchase-order-detail/:id', component: OurPurchaseOrderDetailComponent },
          { path: 'vendor-invoice-detail/:id', component: VendorInvoiceDetailComponent}
        ]
      },
      {
        path: 'shipments',
        component: ShipmentComponent
      },
      {
        path: 'shipment-detail/:id',
        component: ShipmentDetailComponent
      },
      {
        path: 'container-detail/:id',
        component: ContainerDetailComponent
      },
      {
        path: 'shipmentTypes',
        component: ShipmentTypeComponent
      },
      {
        path: 'vessels',
        component: VesselComponent
      },
      {
        path: 'brokers',
        component: BrokerComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ])
  ],
  providers: [CustomerService, MessageService, BrokerService, VendorService,
  DesignService, PurchaseOrderService, ItemService, VesselService, ShipmentTypeService,
  ShipmentService, ContainerService, LoginService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
