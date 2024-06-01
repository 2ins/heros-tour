import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, map, startWith } from 'rxjs';
import { GetActivitiesOverview } from 'src/app/actions/activity.action';
import { SearchHeroes } from 'src/app/actions/hero.action';
import { GetLocations } from 'src/app/actions/locations.action';
import { GetMastersOverviewSearch } from 'src/app/actions/master.action';
import { SetActivitySearch } from 'src/app/actions/search.action';
import { LocationDbItem } from 'src/app/model/location';
import { Quality, VIRTUES_LIST } from 'src/app/model/quality';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-search-composite',
  templateUrl: './search-composite.component.html',
  styleUrls: ['./search-composite.component.css'],
})
export class SearchCompositeComponent implements OnInit {
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  @Select(HeroState.getActivitySearch) searchX?: Observable<Search>;

  @Select(HeroState.getAllLocations) locationsAll?: Observable<
    LocationDbItem[]
  >;
  filteredStreets?: Observable<string[]>;
  streets: string[] = [];

  search: string = '';
  searchLoc: string = '';
  hashMap = new Map<string, Quality[]>();
  virtuesList = VIRTUES_LIST;
  isMobile: boolean = false;
  theQualities?: Quality[];

  @Input()
  placeHolder?: string;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification() {
    var x = {
      search: this.search,
      arr: this.getArr(),
      location: this.searchLoc,
    } as Search;
    this.store.dispatch(new SetActivitySearch(x));
    this.router.navigate(['/home']);

    this.store.dispatch(new GetActivitiesOverview(x));
    this.store.dispatch(new SearchHeroes(x));
    this.store.dispatch(new GetMastersOverviewSearch(x));
    //this.notifyParent.emit(x);
    // this.router.navigate(['/home']);
  }

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router,
    private mobile: MobileService
  ) {}

  ngOnInit(): void {
    this.qualities?.subscribe((quos) => {
      this.theQualities = quos;
      this.theQualities.forEach((el: Quality) => {
        if (!this.hashMap.get(el.virtue)) {
          this.hashMap.set(el.virtue, []);
        }
        this.hashMap.get(el.virtue)?.push(el);
      });
    });

    this.isMobile = this.mobile.isMobile();

    this.store.dispatch(new GetLocations());
    this.locationsAll?.subscribe((e) => {
      this.streets = e.map((oggetto) => oggetto.frammento);
    });
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    var auxS = { search: '', arr: [], location: '' } as Search;

    this.searchX?.subscribe((sea) => {
      this.searchLoc = sea.location;
      this.theQualities?.map((e) => (e.selected = false));
      sea.arr.forEach((index) => {
        if (this.theQualities) {
          const quality = this.theQualities.find(
            (el: Quality) => el.id == index
          );
          if (quality) {
            quality.selected = true;
          }
        }
      });
    });
  }
  getArr(): number[] {
    var arr: number[] = [];
    if (this.theQualities) {
      this.theQualities.forEach((item: Quality) => {
        if (item.selected) {
          arr.push(item.id);
        }
      });
    }
    return arr;
  }

  updateItem(q: Quality): void {
    console.log('dai: ', q);
    q.selected = !q.selected;
  }

  control = new FormControl();

  private _filter(value: string): string[] {
    if (value.length > 0) {
      const filterValue = this._normalizeValue(value);
      return this.streets.filter((street) =>
        this._normalizeValue(street).includes(filterValue)
      );
    }
    return [];
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
