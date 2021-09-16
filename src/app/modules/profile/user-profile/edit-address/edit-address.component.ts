import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User, UserAddress } from '@data/schema/user';
import { UserService} from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {

  user: User = {} as User; 
  @Output() onSaveSuccess = new EventEmitter<boolean>();;  
  
  constructor(private userService: UserService) { }
 
  ngOnInit() { 
  
  }

  ngAfterContentInit() {
    this.user.address = { } as UserAddress;
  }

  onSubmit(signUp: NgForm) {
    if(signUp.valid) {        
      this.onSaveSuccess.emit(false);
    }   
  }

  ngOnDestroy() {
    
  }

}
