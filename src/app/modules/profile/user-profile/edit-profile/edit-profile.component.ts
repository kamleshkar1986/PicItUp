import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@data/schema/user';
import { UserService} from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  editUser: User = {} as User; 
  userSub: Subscription;
  @Output() onSaveSuccess = new EventEmitter<boolean>();;  
  
  constructor(private userServ: UserService, private cd: ChangeDetectorRef) { }
 
  ngOnInit() { 
    this. userSub = this.userServ.loggedInUserObs.subscribe(loggedInUser => {     
      this.editUser = {...loggedInUser};  
      this.cd.detectChanges();
    });
  }

  onSubmit(signUp: NgForm) {
    if(signUp.valid) {   
      this.userServ.updateProfile(this.editUser).subscribe();     
      this.onSaveSuccess.emit(false);
    }   
  }
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
