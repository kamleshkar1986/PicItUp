import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {

  showSpinner: boolean = false;
  private spinnerSub: Subscription; 

  constructor(private spinnerServ: SpinnerService, private cd: ChangeDetectorRef) { }

  ngOnInit() {   
    this.spinnerSub = this.spinnerServ.showSpinnerSub.subscribe(show => {     
      this.showSpinner = show;
      this.cd.detectChanges();
    });   
  }

  ngOnDestroy() {
    this.spinnerSub.unsubscribe();
  }
}
