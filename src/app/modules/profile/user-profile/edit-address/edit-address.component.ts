import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
  userAdd: UserAddress = {} as UserAddress;
  userSub: Subscription;
  @Output() onSaveSuccess = new EventEmitter<boolean>();;  
  
  constructor(private userServ: UserService, private cd: ChangeDetectorRef) { }
 
  ngOnInit() { 
    this. userSub = this.userServ.loggedInUserObs.subscribe(loggedInUser => {     
      this.user = {...loggedInUser}; 
      this.userAdd = {...loggedInUser?.address};       
      this.initAddress();
      this.cd.detectChanges();
    });
  }

  ngAfterContentInit() {    
    this.initAddress();
  }

  initAddress() {
    if(!this.userAdd?.pinCode) {
      this.userAdd = { 
        area : '',
        building: '',
        city: '',
        landmark: '',
        pinCode: '',
        state: ''
      } as UserAddress;     
    }
  }

  onSubmit(signUp: NgForm) {
    if(signUp.valid) {        
      this.userServ.updateAddress(this.userAdd).subscribe();
      this.onSaveSuccess.emit(false);
    }   
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
