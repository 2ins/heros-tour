import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivityTable } from 'src/app/model/activity';

@Component({
  selector: 'app-activity-master-search',
  templateUrl: './activity-master-search.component.html',
  styleUrls: ['./activity-master-search.component.css'],
})
export class ActivityMasterSearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() onAdd = new EventEmitter<ActivityTable>();

  handleEvent(act: ActivityTable) {
    console.log('acquisissimo', act.description);
    this.onAdd.emit(act);
  }
}
