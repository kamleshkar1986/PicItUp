import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderStatus } from '@data/schema/order';
import { OrderService } from '@data/services/order.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  orderList: Order[] = null;
  filteredOrderList: Order[] = null;
  getOrderSubs: Subscription;
  loadOrdersSubs: Subscription;
  forCart: boolean;
  orderStatusList = Object.keys(OrderStatus);
  orderStatus: string = 'All';

  constructor(
    private ordersServ: OrderService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.forCart = this.route.snapshot.params['tocart'];
    this.orderStatusList = ['All'].concat(this.orderStatusList);
    this.getOrderSubs = this.ordersServ.getUserOrders(this.forCart).subscribe();
    this.loadOrdersSubs = this.ordersServ.ordersObs.subscribe((loaded) => {
      if (loaded) {
        this.orderList = this.ordersServ.orderList;
        this.filteredOrderList = [...this.orderList];
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

  filterOrders() {
    if (this.orderStatus == 'All') {
      this.filteredOrderList = [...this.orderList];
      return;
    }
    this.filteredOrderList = this.orderList.filter(
      (order) => order.orderStatus === this.orderStatus
    );
  }

  ngOnDestroy() {
    this.getOrderSubs.unsubscribe();
    this.loadOrdersSubs.unsubscribe();
  }
}
