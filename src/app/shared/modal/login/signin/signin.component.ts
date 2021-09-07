import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '@data/schema/user';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  user: User = {} as User;
  constructor(private userService: UserService) { }

  ngOnInit() {}

  onSubmit(signIn: NgForm) {
    if(signIn.valid) {        
      this.userService.login(this.user)
      .subscribe(user => { signIn.reset()      
      });     
    }   
  }

}
