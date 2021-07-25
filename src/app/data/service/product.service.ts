  
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../schema/product';
import { JsonApiService } from './json-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private jsonApiService: JsonApiService) {}

  getAll(): Observable<Array<Product>> {
    return this.jsonApiService.get('/projects');
  }

  getSingle(id: number): Observable<Product> {
    return this.jsonApiService.get(`/projects/${id}`);
  }
}