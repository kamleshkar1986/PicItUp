import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@data/schema/user';
import { UserService} from '@data/services/user.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {

  user: User = {} as User;
  showPopUp: boolean = true;
  userSub: Subscription;
  
  constructor(private userService: UserService, private cd: ChangeDetectorRef) { }
 
  ngOnInit() { }


  onSubmit(signUp: NgForm) {
    if(signUp.valid) {        
      this.userSub = this.userService.register(this.user)
      .subscribe(user => { signUp.reset()      
      });     
    }   
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
