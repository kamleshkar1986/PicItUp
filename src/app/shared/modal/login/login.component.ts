import { Component, OnInit } from '@angular/core';

export enum AuthMode {
  SignIn = 1,
  SignUp = 2
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  AuthMode = AuthMode;
  authMode: AuthMode; 
  
  constructor() { }

  ngOnInit() {
    this.authMode = AuthMode.SignIn;
  }

  toggleAuthMode() {
    if(this.authMode === AuthMode.SignIn) {
      this.authMode = AuthMode.SignUp
    }
    else {
      this.authMode = AuthMode.SignIn;
    }
  }

}
