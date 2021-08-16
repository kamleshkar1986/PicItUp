import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  showModal = true;

  constructor() { }

  ngOnInit() {}

  closeAlert() {
    this.showModal = false;
  }

}
