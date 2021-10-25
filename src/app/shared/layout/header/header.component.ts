import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NoteEvent, NotificationService } from '@core/services/error';
import { Product } from '@data/schema/product';
import { ProductService } from '@data/services/product.service';
import { UserService } from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  headerNote: string; // = "Login / Signup";
  products: Product[];  
  private userSub: Subscription;  
  private prodSub: Subscription;

  constructor(
    private userServ: UserService,
    private prodServ: ProductService,    
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.products = this.prodServ.productList;
    this.userSub = this.userServ.loggedInUserObs.subscribe((loggedInUser) => {
      this.headerNote = 'Login / Signup';
      this.isAuthenticated = !!loggedInUser;
      if (this.isAuthenticated) {
        this.headerNote = 'Hi,' + loggedInUser.firstName;
      }
      this.cd.detectChanges();
    });

    this.prodSub = this.prodServ.productsObs.subscribe((loaded) => {
      if (loaded) {
        this.products = this.prodServ.productList;
        this.cd.detectChanges();
      }
    });    
  }  

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.prodSub.unsubscribe();    
  }
}
