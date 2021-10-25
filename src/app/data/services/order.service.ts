import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from '@core/services';
import { Order } from '../schema/order';
import { map } from 'rxjs/operators';
import {
  NoteEvent,
  NotificationMesg,
  NotificationService,
  NotificationType,
} from '@core/services/error';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderData: Order;

  private notify: NotificationMesg = {
    errorEvent: NoteEvent.Client,
    mesg: '',
    mesgHead: '',
    mesgType: NotificationType.Success,
  };

  private orders: Order[];
  private ordersSub = new BehaviorSubject<boolean>(false);
  public readonly ordersObs: Observable<boolean> =
    this.ordersSub.asObservable();

  public get orderList() {
    return this.orders;
  }

  prepareOrder(order: Order) {
    this.orderData = order;
  }

  constructor(
    private apiService: ApiService,
    private notifyServ: NotificationService,
    private userServ: UserService,
    private route: Router
  ) {}

  private constructUrl(apiAction: String) {
    return `/order/${apiAction}/`;
  }

  buyNow(toCart: boolean): Observable<any> {
    if (!this.orderData?.photos || this.orderData.photos.length <= 0) {
      throw new Error('Please choose some photos to buy!');
    }

    let postData = new FormData();
    postData.append('itemName', this.orderData.itemName);
    for (var i = 0; i < this.orderData.photos.length; i++) {
      this.orderData.photos[i];
      postData.append(
        'photos',
        this.orderData.photos[i],
        `${this.orderData.itemName}.${
          this.orderData.photos[i].type.split('/')[1]
        }`
      );
    }

    let actionPath: string = 'buy-now';
    if (toCart) {
      actionPath = 'add-to-cart';
    }

    return this.apiService
      .postWithFile(this.constructUrl(actionPath), postData)
      .pipe(
        map((order) => {
          if (order.status == 1) {
            this.notify.mesg = `${this.orderData.itemName} has been added to cart!`;
            this.notify.errorEvent = NoteEvent.Server;
            this.notifyServ.showError(this.notify);
            this.route.navigate(['/orders/' + toCart]);
          }
        })
      );
  }

  getUserOrders(getCart: boolean): Observable<any> {
    const params = new HttpParams()
      .append('email', this.userServ.loggedInUser.email)
      .append('getCart', getCart);
    return this.apiService
      .get(this.constructUrl('get-user-orders'), params)
      .pipe(
        map((orders) => {
          if (orders.status == 1) {
            this.orders = orders.data;           
            this.ordersSub.next(true);
          }
        })
      );
  }

  buyFromCart(orderId: string) {
    return this.apiService
      .post(this.constructUrl('buy-from-cart'), { orderId: orderId })
      .pipe(
        map((resp) => {
          if (resp.status == 1) {
            return true;
          }
        })
      );
  }
}
