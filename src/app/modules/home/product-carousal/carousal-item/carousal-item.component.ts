import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@data/schema/product';

@Component({
  selector: 'app-carousal-item',
  templateUrl: './carousal-item.component.html',
  styleUrls: ['./carousal-item.component.scss'],
})
export class CarousalItemComponent implements OnInit {
  @Input() public product: Product;

  constructor() { }

  ngOnInit() {}

}
