import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  headerNote: string = "Login / Signup";
  constructor(private userServ: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.userServ.loggedInUserObs.subscribe(loggedInUser => {       
      this.isAuthenticated = !!loggedInUser;
      if(this.isAuthenticated) {
        this.headerNote = "Hi," + loggedInUser.firstName 
      }
      this.cd.detectChanges();
    });
  }
}
