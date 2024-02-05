import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetSelectedActivity } from 'src/app/actions/activity.action';
import { Activity } from 'src/app/model/activity';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css'],
})
export class ActivityItemComponent implements OnInit {
  @Input()
  activity?: Activity;

  @Input()
  reverse?: boolean;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelect(activity: Activity): void {
    this.store.dispatch(new SetSelectedActivity(activity.id));
    this.router.navigate(['/activities/activity/', activity.id]);
  }
}
