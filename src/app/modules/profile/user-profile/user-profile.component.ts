import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@data/schema/user';
import { UserService } from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {

  showEditProfile = false;
  showEditAddress = false;
  private userSub: Subscription;
  user: User;
  
  constructor(private userServ: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this. userSub = this.userServ.loggedInUserObs.subscribe(loggedInUser => {     
      this.user = {... loggedInUser? loggedInUser : {} as User};
      this.cd.detectChanges();
    });
    // this.user.address = {
    //   area : "Block D-1, South City 2",
    //   city : "Gurugram",
    //   building: "3rd Floor, House No. 33,",
    //   landmark: "Near Basant Valley School",
    //   pinCode: "122018",
    //   state: "Haryana",       
    // }
    // this.user.mobile = "9717666827";
  }

  toggleEditProfile() {   
    this.showEditProfile = !this.showEditProfile;
  }

  toggleEditAddress() {   
    this.showEditAddress = !this.showEditAddress;
  }

  
  saveProfile() {
    this.toggleEditProfile();
  }

  saveAddress() {
    this.toggleEditAddress();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
