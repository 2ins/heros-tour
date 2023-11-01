import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivityTable } from 'src/app/model/activity';

@Component({
  selector: 'app-activity-master-insert',
  templateUrl: './activity-master-insert.component.html',
  styleUrls: ['./activity-master-insert.component.css'],
})
export class ActivityMasterInsertComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onAdd = new EventEmitter();

  onButtonClick(activity: ActivityTable) {
    this.onAdd.emit(activity);
    console.log('onButtonClick activity', activity);
  }
}
