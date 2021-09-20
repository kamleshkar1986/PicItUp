import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@data/schema/product';
import { ProductService } from '@data/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: Product;
  
  constructor(private route: ActivatedRoute, private prodServ: ProductService, private cd: ChangeDetectorRef) { }

  ngOnInit() {  
    this.product = {} as Product;
    this.prodServ.productsObs.subscribe(loaded => {
      if(loaded) {
        const prodSno= this.route.snapshot.params['sno'];       
        this.product = this.prodServ.productList.filter(prod => prod.sNo == prodSno)[0];
        this.cd.detectChanges();
      }
    });    
  }

}
