import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@data/schema/product';
import { OrderService } from '@data/services/order.service';
import { ProductService } from '@data/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {
  product: Product;
  prodSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private prodServ: ProductService,
    private orderServ: OrderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.product = { aspectRatio: '1:1' } as Product;
    this.prodSub = this.prodServ.productsObs.subscribe((loaded) => {
      if (loaded) {
        const prodSno = this.route.snapshot.params['sno'];
        this.product = this.prodServ.productList.filter(
          (prod) => prod.sNo == prodSno
        )[0];
        this.cd.detectChanges();
      }
    });
  }

  getAspectRatio(): number {
    return (
      +this.product.aspectRatio.split(':')[0] /
      +this.product.aspectRatio.split(':')[0]
    );
  }

  buyNow() {
    this.orderServ.buyNow().subscribe();
  }

  ngOnDestroy() {
    this.prodSub.unsubscribe();
  }
}
