import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Order, OrderStatus } from '@data/schema/order';
import { User } from '@data/schema/user';
import { OrderService } from '@data/services/order.service';
import { UserService } from '@data/services/user.service';
import { environment } from '@env';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnDestroy {
  @Input() order: Order = null;
  @Input() index: number = 0;
  orderStatusList = Object.keys(OrderStatus);
  orderStatus: string;
  user: User;
  private userSub: Subscription;

  constructor(
    private orderServ: OrderService,
    public userServ: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const index = this.orderStatusList.indexOf('Carted', 0);
    if (index > -1) {
      this.orderStatusList.splice(index, 1);
    }

    this.orderStatus = this.order.orderStatus;
    this.userSub = this.userServ.loggedInUserObs.subscribe((loggedInUser) => {
      this.user = { ...(loggedInUser ? loggedInUser : ({} as User)) };
      this.cd.detectChanges();
    });
    //this.cd.detectChanges();
  }

  getPhotoURL(val: File) {
    const photoPath = String(val).replace(/\\/g, '/').replace('uploads', '');
    const serverPath = environment.api_url.replace('/api', '');
    return serverPath + photoPath;
  }

  downloadOrder(orderId: string) {
    this.orderServ.downloadOrderPhotos(orderId).subscribe((file) => {
      this.downLoadFile(file);
    });
  }

  updateOrderStatus() {
    this.orderServ
      .updateOrderStatus(this.order._id, this.orderStatus)
      .subscribe((res) => {
        if (res === true) {
          this.order.orderStatus = this.orderStatus;
        }
      });
  }

  downLoadFile(data: any) {
    let type = data.type;
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);

    var fileLink = document.createElement('a');
    fileLink.href = url;

    // it forces the name of the downloaded file
    fileLink.download = this.order.user.firstName + this.order._id + '.zip';

    // triggers the click event
    fileLink.click();

    // let pwa = window.open(url);
    // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //   alert('Please disable your Pop-up blocker and try again.');
    // }
  }

  toMatrix = (arr, width) =>
    arr.reduce(
      (rows, key, index) =>
        (index % width == 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      []
    );

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
