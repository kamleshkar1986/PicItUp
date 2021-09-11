import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from '@shared/modal/login/login.component';
import { SignupComponent  } from '@shared/modal/login/signup/signup.component';
import { SigninComponent } from '@shared/modal/login/signin/signin.component';
import { AlertComponent } from '@shared/modal/alert/alert.component';

import { MustMatchDirective } from './directives/must-match.directive';
import { SpinnerComponent } from './modal/spinner/spinner.component';
import { VerifyOtpComponent } from './modal/verify-otp/verify-otp.component';
import { RecoverPasswordComponent } from './modal/recover-password/recover-password.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SigninComponent,
    AlertComponent,
    RecoverPasswordComponent,
    SpinnerComponent,
    VerifyOtpComponent,
    MustMatchDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    VerifyOtpComponent,
    RecoverPasswordComponent
  ]
})
export class SharedModule { }
