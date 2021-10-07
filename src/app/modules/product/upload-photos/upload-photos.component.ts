import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ImageCroppedEvent,
  base64ToFile,
  ImageCropperComponent,
} from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { Product } from '@data/schema/product';
import { OrderService } from '@data/services/order.service';
import { Order } from '@data/schema/order';
//import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss'],
})
export class UploadPhotosComponent implements OnInit {
  previews: File[] = [];
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  order: Order = {} as Order;

  @Input() product: Product;

  @ViewChild('openModal', { static: true }) openModal: ElementRef;
  @ViewChild('closeModal', { static: true }) closeModal: ElementRef;
  @ViewChild('cropper', { static: true })
  private cropper: ImageCropperComponent;

  constructor(private orderServ: OrderService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.order.itemName = this.product.title;
    this.order.unitPrice = this.product.price;
    this.order.photos = [];
    this.order.units = 0;
    this.prepareOrder();
  }

  selectFiles(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileToUpload = this.base64ToFile(
          e.target.result,
          `${this.product.title}`
        );
        this.previews.push(e.target.result);
        this.order.photos.push(fileToUpload);
        this.order.units = this.previews.length;
        this.order.totalPrice = this.order.unitPrice * this.order.units;
        this.prepareOrder();
      };
      reader.readAsDataURL(file);
    }
  }

  prepareOrder() {
    this.orderServ.prepareOrder(this.order);
  }

  onFileChange(event: any): void {
    this.openModal.nativeElement.click();
    this.imgChangeEvt = event;
    this.cd.detectChanges();
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    this.selectFiles(
      this.base64ToFile(this.cropImgPreview, `${this.product.title}`)
    );
  }

  base64ToFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  cropPhoto() {
    this.cropper.crop();
    this.closeModal.nativeElement.click();
  }
}
