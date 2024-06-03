import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetActivitiesOverview } from 'src/app/actions/activity.action';
import { SearchHeroes } from 'src/app/actions/hero.action';
import { GetAggLocationsCombo } from 'src/app/actions/locations.action';
import { GetMastersOverviewSearch } from 'src/app/actions/master.action';
import { GetQualities } from 'src/app/actions/quality.action';
import { SetActivitySearch } from 'src/app/actions/search.action';
import {
  LocationAggComboDbItem,
  LocationAggComboJson,
} from 'src/app/model/location';
import { Quality, VIRTUES_LIST, Virtue } from 'src/app/model/quality';
import { Search } from 'src/app/model/search';
import { HeroState } from 'src/app/states/todo.state';

@Component({
  selector: 'app-agg-locations-view',
  templateUrl: './agg-locations-view.component.html',
  styleUrls: ['./agg-locations-view.component.css'],
})
export class AggLocationsViewComponent implements OnInit {
  selected?: LocationAggComboDbItem;
  selectedVirtue?: Virtue;
  demo1TabIndex: number = 0;
  tab2Index: number = 0;
  bigtabIndex: number = 0;
  @Select(HeroState.getAggComboLocations) locationsCombo?: Observable<
    LocationAggComboDbItem[]
  >;
  @Select(HeroState.getActivitySearch) searchX?: Observable<Search>;
  sea?: Search;

  @Select(HeroState.getQualityList) qualitites?: Observable<Quality[]>;
  virtueList = VIRTUES_LIST;
  thequalitites: Quality[] = [];
  currentqualitites: Quality[] = [];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.locationsCombo?.subscribe((e) => {
      if (e.length == 0) {
        this.store.dispatch(new GetAggLocationsCombo());
      }
    });
    this.qualitites?.subscribe((e) => {
      if (e.length == 0) {
        this.store.dispatch(new GetQualities());
      }
      this.thequalitites = e;
    });
    this.searchX?.subscribe((e) => {
      this.sea = e;
      if (!this.sea) {
        this.store.dispatch(
          new SetActivitySearch({ search: '', arr: [], location: '' } as Search)
        );
      }
    });
  }
  select(item: LocationAggComboDbItem): void {
    this.selected = item;
    this.demo1TabIndex = 1;
  }

  doSomething(item: LocationAggComboJson): void {
    this.bigtabIndex++;
    if (this.sea) {
      this.sea.location = item.level_1;
      this.store.dispatch(new SetActivitySearch(this.sea));
      this.go();
    }
  }
  doSomethingCountry(item: LocationAggComboDbItem): void {
    if (this.sea) {
      this.sea.location = item.stato;
      this.store.dispatch(new SetActivitySearch(this.sea));
      this.go();
    }
  }

  go() {
    if (this.sea) {
      this.store.dispatch(new SetActivitySearch(this.sea));
      this.router.navigate(['/home']);
      this.store.dispatch(new GetActivitiesOverview(this.sea));
      this.store.dispatch(new SearchHeroes(this.sea));
      this.store.dispatch(new GetMastersOverviewSearch(this.sea));
    }
  }
}
