import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductCarousalComponent } from './product-carousal/product-carousal.component';
import { CarousalItemComponent } from './product-carousal/carousal-item/carousal-item.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage, ProductListComponent, ProductItemComponent, ProductCarousalComponent, CarousalItemComponent]
})
export class HomePageModule {}
