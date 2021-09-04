import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@data/schema/user';
import { UserService} from '@data/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  user: User = {} as User;
  
  constructor(private userService: UserService) { }
 
  ngOnInit() { }


  onSubmit(signUp: NgForm) {
    if(signUp.valid) {        
      this.userService.register(this.user)
      .subscribe(user => {
        this.user = user;            
      });     
    }   
  }

}
