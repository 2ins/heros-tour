import { Component, Input, OnInit } from '@angular/core';
import { LocationAggDbItem } from 'src/app/model/location';

@Component({
  selector: 'app-location-master-item',
  templateUrl: './location-master-item.component.html',
  styleUrls: ['./location-master-item.component.css'],
})
export class LocationMasterItemComponent implements OnInit {
  showAll = false; // Imposta a false per default per mostrare solo i primi tre

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  constructor() {}

  @Input()
  locations?: LocationAggDbItem[];

  ngOnInit(): void {}
}
