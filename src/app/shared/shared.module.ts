import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from '@shared/modal/login/login.component';
import { SignupComponent  } from '@shared/modal/login/signup/signup.component';
import { SigninComponent } from '@shared/modal/login/signin/signin.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SigninComponent
  ]
})
export class SharedModule { }
