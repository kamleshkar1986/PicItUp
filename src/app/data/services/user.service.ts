import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '@core/services';
import { User } from '../schema/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURLPrefix: string = 'auth';

  constructor (
    private apiService: ApiService
  ) {}

  private constructUrl(apiAction: String) {
    return `/auth/${apiAction}/`;
  }

  register(user: User): Observable<any> {      
      return this.apiService.post(this.constructUrl('register'), user)
        .pipe(map(data => data.article));    
  }
}
