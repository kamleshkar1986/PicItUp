import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  forCart: boolean;

  constructor(
    private ordersServ: OrderService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.forCart = this.route.snapshot.params['tocart'];
    this.getOrderSubs = this.ordersServ.getUserOrders(this.forCart).subscribe();
    this.loadOrdersSubs = this.ordersServ.ordersObs.subscribe((loaded) => {
      if (loaded) {
        this.orderList = this.ordersServ.orderList;
        this.cd.detectChanges();
      }
    });
    this.cd.detectChanges();
  }

  getFileName(input: string) {
    return input.toLowerCase().replace(/\s/g, '') + '.jpg';
  }

  buyFromCart(orderId: string) {
    this.ordersServ.buyFromCart(orderId).subscribe();
  }

  ngOnDestroy() {
    this.getOrderSubs.unsubscribe();
    this.loadOrdersSubs.unsubscribe();
  }
}
