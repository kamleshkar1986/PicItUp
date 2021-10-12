import { Component, OnInit } from '@angular/core';
import { OrderService } from '@data/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  constructor(private ordersServ: OrderService) {}

  ngOnInit() {
    this.ordersServ.getUserOrders().subscribe();
  }
}
