import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedModule } from '@shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { EditAddressComponent } from './user-profile/edit-address/edit-address.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProfilePageRoutingModule
  ],
  declarations: [
    ProfilePage,
    UserProfileComponent,
    EditProfileComponent,
    EditAddressComponent
  ]
})
export class ProfilePageModule {}
