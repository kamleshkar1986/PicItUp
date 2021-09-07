import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@data/schema/user';
import { UserService} from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {

  user: User = {} as User;
  showPopUp: boolean = true;
  
  constructor(private userService: UserService) { }
 
  ngOnInit() { }

  onSubmit(signUp: NgForm) {
    if(signUp.valid) {        
      this.userService.register(this.user)
      .subscribe(user => { //signUp.reset()      
      });     
    }   
  }

  ngOnDestroy() {
    
  }
}
