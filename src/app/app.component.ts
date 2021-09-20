import { Component, OnInit } from '@angular/core';
import { ProductService } from '@data/services/product.service';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userServ: UserService, private prodService: ProductService ) {}

  ngOnInit() {
    this.userServ.autoLogin();
    this.prodService.get()
    .subscribe();
  }
}
