import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { SharedModule } from '@shared/shared.module';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    SharedModule,
  ],
  declarations: [OrdersPage, PhotosComponent],
})
export class OrdersPageModule {}
