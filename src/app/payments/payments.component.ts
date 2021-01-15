import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { Payment } from '../$models/payment';
import { CodeService } from '../$services/code/code.service';
import { PaymentService } from '../$services/payment/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  subscription: Subscription;
  everytwoSeconds: Observable<number> = timer(0, 2000);
  code = '';
  paymentList: Payment[] = []
  payment = '';
  amount = '';

  constructor(private codeService: CodeService, private PaymentService: PaymentService) { }

  ngOnInit(): void {
    this.subscription = this.everytwoSeconds.subscribe(() => {
     this.code = this.codeService.getCode();
    });

    this.paymentList = this.PaymentService.getPayments();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  AddPayment() {
    const payment: Payment = {
      name: this.payment,
      amount: this.amount,
      code: this.code,
      grid: '64'
    }
    this.PaymentService.addPayment(payment);
    this.payment = '';
    this.amount = ''
  }
}
