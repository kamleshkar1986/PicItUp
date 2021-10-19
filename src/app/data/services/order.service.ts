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
    private userServ: UserService
  ) {}

  private constructUrl(apiAction: String) {
    return `/order/${apiAction}/`;
  }

  buyNow(): Observable<any> {
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

    return this.apiService
      .postWithFile(this.constructUrl('buy-now'), postData)
      .pipe(
        map((order) => {
          if (order.status == 1) {
            this.notify.mesg = `You order for ${this.orderData.itemName} has been placed successfully!`;
            this.notify.errorEvent = NoteEvent.Server;
            this.notifyServ.showError(this.notify);
          }
        })
      );
  }

  getUserOrders(): Observable<any> {
    const params = new HttpParams().append(
      'email',
      this.userServ.loggedInUser.email
    );
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
}
