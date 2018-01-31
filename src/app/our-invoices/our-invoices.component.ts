import { Component, OnInit } from '@angular/core';
import {OurInvoice} from './ourInvoice';
import {Customer} from '../app.customer';
import {CustomerService} from '../app.customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-our-invoices',
  templateUrl: './our-invoices.component.html',
  styleUrls: ['./our-invoices.component.css']
})
export class OurInvoicesComponent implements OnInit {
  customer: Customer;

  // form inputs
  invoiceID: string;
  // entity data
  invoices: OurInvoice[];
  selectedInvoice: OurInvoice;
  isWarning = OurInvoicesComponent.isWarning;
  isDanger = OurInvoicesComponent.isDanger;
  isSuccessful = OurInvoicesComponent.isSuccessful;

  static isWarning(invoice: OurInvoice): boolean {
    return false;
  }

  static isDanger(invoice: OurInvoice): boolean {
    return false;
  }

  static isSuccessful(invoice: OurInvoice): boolean {
    return false;
  }

  constructor(private router: Router,
              private customerService: CustomerService) {
    this.customerService.customerStream.subscribe(
      c => {
        this.customer = c;
        this.getInvoices();
      }
      )
  }

  onSelect(inv: OurInvoice): void {
    this.selectedInvoice = inv;
  }

  ngOnInit() {
  }

  addInvoice(): void {
    const rightNow = new Date();
    const res = rightNow.toISOString().slice(0, 10);
    const invoiceID = this.invoiceID.trim();
    if (!invoiceID) { return; }
    const i = new OurInvoice();
    i.customerID = this.customer.entityID;
    i.date = res;
    i.invoiceID = invoiceID;
    i.terms = 120;
    i.paid = false;
    i.entityID = '';
    this.customerService.addInvoice(i)
      .subscribe(inv => {
        if (inv != null) {
          this.invoices.push(inv);
        }
      });
  }

  getInvoices(): void {
    this.customerService.getCustomerOurInvoices(this.customer.entityID)
      .subscribe(invoices => this.invoices = invoices);
  }

  gotoDetail(): void {
    const lastSlash = this.router.url.lastIndexOf('/');
    const url = this.router.url.substring(0, lastSlash);
    const add = '/our-invoice-detail';
    console.log(url + add);
    this.router.navigate([url + add, this.selectedInvoice.entityID]);
  }
}
