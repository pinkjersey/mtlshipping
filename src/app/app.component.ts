import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <nav>
    <a routerLink="/dashboard">Dashboard</a>
    <a routerLink="/customers">Customers</a>
    <a routerLink="/vendors">Vendors</a>
    <a routerLink="/shipping">Shipping</a>
    <a routerLink="/designs">Designs</a>
    <a routerLink="/brokers">Brokers</a>
    <a routerLink="/vessels">Vessels</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'MTL Shipping Manager';
}
