import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetSelectedActivity } from 'src/app/actions/activity.action';
import { Activity } from 'src/app/model/activity';
import { Search } from 'src/app/model/search';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css'],
})
export class ActivityItemComponent implements OnInit {
  @Input()
  activity?: Activity;

  @Select(HeroState.getActivitySearch) search?: Observable<Search>;

  theSearch?: Search;

  @Input()
  reverse?: boolean;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.search?.subscribe((x) => {
      this.theSearch = x;
    });
  }

  onSelect(activity: Activity): void {
    this.store.dispatch(new SetSelectedActivity(activity.id, '', []));
    this.router.navigate(['/activities/activity/', activity.id]);
  }
}
