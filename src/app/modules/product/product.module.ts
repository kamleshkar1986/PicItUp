import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { SharedModule } from '@shared/shared.module';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProductPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [
    ProductPage,
    UploadPhotosComponent
  ]
})
export class ProductPageModule {}
