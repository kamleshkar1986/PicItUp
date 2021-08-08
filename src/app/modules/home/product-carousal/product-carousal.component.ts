import { Component, OnInit, Input } from '@angular/core';

import { Product } from '@data/schema/product';

@Component({
  selector: 'app-product-carousal',
  templateUrl: './product-carousal.component.html',
  styleUrls: ['./product-carousal.component.scss'],
})
export class ProductCarousalComponent implements OnInit {

  @Input() products: Product[];
  constructor() { }
  ngOnInit() { }
}
