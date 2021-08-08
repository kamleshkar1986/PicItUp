import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '@core/services';
import { Product } from '../schema/product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor (
    private apiService: ApiService
  ) {}

  get(): Observable<Product[]> {
    return this.apiService.get('/products/')
      .pipe(map(resp => resp.data));
  }
}
