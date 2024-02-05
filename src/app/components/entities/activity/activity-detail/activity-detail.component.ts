import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetSelectedActivity } from 'src/app/actions/activity.action';
import { Activity } from 'src/app/model/activity';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css'],
})
export class ActivityDetailComponent implements OnInit {
  @Select(HeroState.getSelectedActivity)
  selectedActivity?: Observable<Activity>;

  @Select(HeroState.getActivities) activities?: Observable<Activity[]>;

  activity?: Activity;
  activityId?: any;
  isMobile: boolean = false;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private ms: MobileService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.selectedActivity?.subscribe((a) => {
      this.activity = a;
      a.qualities?.sort((a, b) => b.count - a.count);
    });

    this.activatedRoute.paramMap.subscribe((map) => {
      this.activityId = map.get('id');
      console.log('activityId?:' + this.activityId);
      if (this.activityId) {
        this.store.dispatch(new SetSelectedActivity(this.activityId));
      }
    });

    /*
    this.activities?.subscribe((list) => {
      console.log('di concetto');
      if (list) {
        if (list.length == 0) {
          this.store.dispatch(new GetActivitiesOverview(''));
        } else {
          this.activity = list.find((x) => x.id == this.activityId);
          console.log('attivita selezionata:', this.activityId);
          if (this.activity) {
            this.store.dispatch(new SetSelectedActivity(this.activity));
          }
        }
      }
    });
    */
  }

  backClicked() {
    this.location.back();
  }
  edit() {
    const appo = { activity: this.activity };
    console.log('prima', appo);
    this.route.navigateByUrl('/addActivity', { state: appo });
  }
}
