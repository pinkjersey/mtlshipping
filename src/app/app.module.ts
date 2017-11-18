import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { CustomersComponent } from './app.customer.component';
import {CustomerDetailComponent} from './app.customer-detail.component';
import {DashboardComponent} from './app.dashboard.component';
import {CustomerService} from './app.customer.service';
import { MessageService } from './message.service';
import { BrokerComponent } from './broker/broker.component';
import {BrokerService} from "./broker.service";

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailComponent,
    DashboardComponent,
    BrokerComponent
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
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'detail/:id',
        component: CustomerDetailComponent
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
  providers: [CustomerService, MessageService, BrokerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
