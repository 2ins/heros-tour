import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtues',
  templateUrl: './virtues.component.html',
  styleUrls: ['./virtues.component.css'],
})
export class VirtuesComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  backClicked() {
    this.location.back();
  }
}
