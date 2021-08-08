import { Component, OnInit } from '@angular/core';

import { ProductService } from '@data/services/product.service';
import { Product } from '@data/schema/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private prodService: ProductService) { }

  ngOnInit() {
    this.prodService.get()
    .subscribe(prod => {
      this.products = prod;
      console.log(this.products);
    });
  }

}
