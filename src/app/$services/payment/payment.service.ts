import { Injectable } from '@angular/core';
import { Payment } from 'src/app/$models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  items: Payment[] = [];

  constructor() { }

  addPayment(item: Payment) {
    this.items.push(item);
  }

  getPayments() {
    return this.items;
  }

  clearPayments() {
    this.items = [];
    return this.items;
  }
}
