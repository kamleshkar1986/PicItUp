import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showSpinnerSub = new BehaviorSubject<boolean>(false);  
  constructor() { }
  toggleSpinner(show: boolean) {    
    this.showSpinnerSub.next(show);  
  } 
}
