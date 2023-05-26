import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  GetActivitiesOverview,
  SetSelectedActivity,
} from 'src/app/actions/activity.action';
import { Activity } from 'src/app/model/activity';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  @Select(HeroState.getActivities) activities?: Observable<Activity[]>;

  searchActivity?: string;
  search: Search = { search: '', arr: [] };
  isMobile: boolean = false;
  indxTab: number = 0;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private ms: MobileService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.activities?.subscribe((as) => {
      if (as) {
        if (
          as.length == 0 &&
          (!this.searchActivity || this.searchActivity.trim() == '')
        ) {
          this.store.dispatch(new GetActivitiesOverview(this.search));
        }
      }
    });
  }

  onSelect(activity: Activity): void {
    this.store.dispatch(new SetSelectedActivity(activity.id));
  }

  getNotification(evt: Event) {
    var x = evt as unknown as Search;
    this.store.dispatch(new GetActivitiesOverview(x));
    this.indxTab = 0;
  }
}
