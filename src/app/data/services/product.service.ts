import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from '@core/services';
import { Product } from '../schema/product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[];
  private productsSub = new BehaviorSubject<boolean>(false);
  public readonly productsObs: Observable<boolean> = this.productsSub.asObservable();

  public get productList() {
    return this.products;
  }
  
  constructor (
    private apiService: ApiService
  ) {}

  get(): Observable<Product[]> {
    return this.apiService.get('/products/')
      .pipe(map(resp => {
        this.products = resp.data;
        this.productsSub.next(true);
        return resp.data;
      }));
  }
}
