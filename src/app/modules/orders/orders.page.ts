import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '@data/schema/order';
import { OrderService } from '@data/services/order.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  orderList: Order[] = null;
  getOrderSubs: Subscription;
  loadOrdersSubs: Subscription;

  constructor(private ordersServ: OrderService) {}

  ngOnInit() {
    this.getOrderSubs = this.ordersServ.getUserOrders().subscribe();
    this.loadOrdersSubs = this.ordersServ.ordersObs.subscribe((loaded) => {
      if (loaded) {
        this.orderList = this.ordersServ.orderList;
      }
    });
  }

  getFileName(input: string) {
    return input.toLowerCase().replace(/\s/g, '') + '.jpg';
  }

  ngOnDestroy() {
    this.getOrderSubs.unsubscribe();
    this.loadOrdersSubs.unsubscribe();
  }
}
