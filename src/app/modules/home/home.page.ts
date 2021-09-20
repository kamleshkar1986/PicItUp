import { Component, OnInit } from '@angular/core';
import { ProductService } from '@data/services/product.service';
import { Product } from '@data/schema/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {  
  products: Product[];
  
  constructor(private prodService: ProductService) { }
 
  ngOnInit() {   
    this.prodService.productsObs.subscribe(loaded => {
      if(loaded) {        
        this.products = this.prodService.productList;
        //this.cd.detectChanges();
      }
    });    
  }
}
