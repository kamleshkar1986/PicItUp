import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  headerNote: string;// = "Login / Signup";
  private userSub: Subscription;
  constructor(private userServ: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this. userSub = this.userServ.loggedInUserObs.subscribe(loggedInUser => {     
      this.headerNote = "Login / Signup";  
      this.isAuthenticated = !!loggedInUser;
      if(this.isAuthenticated) {
        this.headerNote = "Hi," + loggedInUser.firstName 
      }
      this.cd.detectChanges();
    });
  }

  logout() {
    this.userServ.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
