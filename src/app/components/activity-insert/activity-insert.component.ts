import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddActivity } from 'src/app/actions/activity.action';
import { ActivityTable } from 'src/app/model/activity';

@Component({
  selector: 'app-activity-insert',
  templateUrl: './activity-insert.component.html',
  styleUrls: ['./activity-insert.component.css'],
})
export class ActivityInsertComponent implements OnInit {
  newActivity: ActivityTable = {
    description: '',
    name: '',
  };

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    var activity = history.state.activity;
    if (activity) {
      this.newActivity = {
        id: activity.id,
        description: activity.description,
        name: activity.name,
      };
    }
  }

  save(): void {
    console.log('save');
    this.store.dispatch(new AddActivity(this.newActivity));
  }
}
