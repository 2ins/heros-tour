import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetActivitiesOverview } from 'src/app/actions/activity.action';
import { SearchHeroes } from 'src/app/actions/hero.action';
import { GetMastersOverviewSearch } from 'src/app/actions/master.action';
import { SetActivitySearch } from 'src/app/actions/search.action';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import { GetQualities } from '../../../../actions/quality.action';
import { Quality, VIRTUES_LIST, Virtue } from '../../../../model/quality';
import { HeroState } from '../../../../states/todo.state';
import { SupabaseService } from '../../../../supabase.service';

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.css'],
})
export class QualitiesComponent implements OnInit {
  openVirtue() {
    var routerLink = '/virtues';
    this.route.navigateByUrl(routerLink);
  }
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  @Select(HeroState.getActivitySearch) searchX?: Observable<Search>;
  sea?: Search;
  isMobile: boolean = false;
  virtueList = VIRTUES_LIST;
  thequalitites: Quality[] = [];
  currentqualitites: Quality[] = [];
  selectedVirtue?: Virtue;
  tab2Index: number = 0;
  constructor(
    private store: Store,
    private readonly supabase: SupabaseService,
    private route: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public mobileService: MobileService
  ) {
    console.log(this.route);
  }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile();
    this.store.dispatch(new GetQualities());
    this.activatedRoute.data.subscribe((d) => {
      console.log('data', d);
    });
    this.searchX?.subscribe((e) => {
      this.sea = e;
      if (!this.sea) {
        this.store.dispatch(
          new SetActivitySearch({
            search: '',
            arr: [],
            location: '',
          } as Search)
        );
      }
    });
    this.qualities?.subscribe((e) => {
      console.log('mbe', e);
      if (e.length == 0) {
        this.store.dispatch(new GetQualities());
      }
      this.thequalitites = e;
    });
  }

  backClicked() {
    this.location.back();

    if (this.location.back.length === 0) {
      this.route.navigate(['/home']);
    } else {
      this.location.back();
    }
  }

  selectVirtue(item: Virtue): void {
    this.selectedVirtue = item;
    this.tab2Index = 2;
    console.log(this.thequalitites);
    console.log(item.id);
    this.currentqualitites = this.thequalitites.filter(
      (e) => e.virtue == item.id
    );
  }
  doSomethingQuality(quality: Quality) {
    if (this.sea) {
      this.sea.arr = [quality.id];
      this.store.dispatch(new SetActivitySearch(this.sea));
      this.route.navigate(['/home']);
      this.store.dispatch(new GetActivitiesOverview(this.sea));
      this.store.dispatch(new SearchHeroes(this.sea));
      this.store.dispatch(new GetMastersOverviewSearch(this.sea));
    }
  }
}
