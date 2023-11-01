import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-simple',
  templateUrl: './header-simple.component.html',
  styleUrls: ['./header-simple.component.css'],
})
export class HeaderSimpleComponent implements OnInit {
  @Input()
  description: String = '';

  @Input()
  isDialog: boolean = false;

  butBackDisabled = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    const previousUrl = this.location.path();
    console.log('previousUrl ', previousUrl);
    if (previousUrl.includes('/addMaster')) {
      this.butBackDisabled = true;
    }
  }

  backClicked() {
    //this.location.back();
    if (!this.isDialog) {
      this.location.back();
    }
  }
}
