import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { GetActivitiesOverview } from 'src/app/actions/activity.action';
import { SearchHeroes } from 'src/app/actions/hero.action';
import { GetLocations } from 'src/app/actions/locations.action';
import { GetMastersOverviewSearch } from 'src/app/actions/master.action';
import { GetQualities } from 'src/app/actions/quality.action';
import { SetActivitySearch } from 'src/app/actions/search.action';
import { LocationDbItem } from 'src/app/model/location';
import { Quality, VIRTUES_LIST } from 'src/app/model/quality';
import { Search } from 'src/app/model/search';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetLocations());
    this.locationsAll?.subscribe((e) => {
      this.streets = e.map((oggetto) => oggetto.frammento);
    });
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    var auxS = { search: '', arr: [], location: '' } as Search;
    /*
    this.qualities?.subscribe((qs) => {
      if (qs && qs.length != 0) {
        qs.forEach((e) => {
          e.selected = false;
          console.log('ciao1', e.id, auxS);
        });

        this.hashMap = new Map([]);
        if (qs != undefined) {
          qs.forEach((el: Quality) => {
            if (!this.hashMap.get(el.virtue)) {
              this.hashMap.set(el.virtue, []);
            }
            this.hashMap.get(el.virtue)?.push(el);
          });
        }
      } else {
        this.store.dispatch(new GetQualities());
      }
    });

    this.searchX?.subscribe((appo) => {
      
    });
*/
    combineLatest([this.searchX, this.qualities]).subscribe((x: any) => {
      var auxS = x[0] as Search;
      var qs = x[1];

      if (auxS == undefined) {
        this.store.dispatch(
          new SetActivitySearch({ search: '', arr: [], location: '' } as Search)
        );
      }

      if (qs && qs.length != 0) {
        qs.forEach((e: any) => {
          e.selected = false;
          if (auxS.arr.find((el) => e.id == el)) {
            e.selected = true;
          }
        });

        this.hashMap = new Map([]);
        if (qs != undefined) {
          qs.forEach((el: Quality) => {
            if (!this.hashMap.get(el.virtue)) {
              this.hashMap.set(el.virtue, []);
            }
            this.hashMap.get(el.virtue)?.push(el);
          });
        }
      } else {
        this.store.dispatch(new GetQualities());
      }
      this.search = auxS.search;
      this.searchLoc = auxS.location;
    });
  }

  getArr(): number[] {
    var arr: number[] = [];
    if (this.qualities) {
      this.qualities
        .pipe(
          map((array: Quality[]) => {
            array.forEach((item: Quality) => {
              if (item.selected) {
                arr.push(item.id);
              }
            });
          })
        )
        .subscribe();
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
