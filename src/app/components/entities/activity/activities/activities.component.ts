import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { map, Observable, startWith } from 'rxjs';
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
  @Select(HeroState.getActivitySearch) searchX?: Observable<Search>;

  searchActivity?: string;
  search: Search = { search: '', arr: [], location: '' };
  isMobile: boolean = false;
  indxTab: number = 0;
  control = new FormControl();

  theActivities: Activity[] = [];
  filteredActivities?: Observable<Activity[]>;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private ms: MobileService
  ) {}

  private _filter(value: string): Activity[] {
    if (value.length > 0) {
      const filterValue = this._normalizeValue(value);
      return this.theActivities.filter((activities) =>
        this._normalizeValue(activities.description).includes(filterValue)
      );
    }
    return this.theActivities;
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnInit(): void {
    this.filteredActivities = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.activities?.subscribe((as) => {
      this.theActivities = as; // Salva tutte le attività
      this.filteredActivities = this.control.valueChanges.pipe(
        startWith(''), // Avvia con un valore vuoto
        map((value) => this._filter(value)) // Applica il filtro
      );
    });

    this.searchX?.subscribe((x) => {
      this.search = x;
    });

    this.isMobile = this.ms.isMobile();

    // this.store.dispatch(new GetActivitiesOverview(this.search));
    //ho la seguente espressione per effettuare sorting fra activities.
    //il requisito cambia voglio eseguire l'ordinamento cosi:
    //per ogni activity prendi in considerazione solo le qualita che sono all'interno del filtro di ricerca
    //this.search.arr contiene gli id della ricerca e as.qualities[i].id contiene l'id della i-esima qualita
    //a questo punto per ogni qualita' considerata calcola appoA = ((x.count || 1) * 100) / (cur.xps_count || 1);

    this.activities?.subscribe((as) => {
      as?.sort((a, b) => {
        var totA = 0;
        a.qualities?.forEach((x) => {
          if (this.search.arr.includes(x.id)) {
            var appo = ((x.count || 1) * 100) / (a.xps_count || 1);
            totA += appo;
          }
        });
        var totB = 0;
        b.qualities?.forEach((x) => {
          if (this.search.arr.includes(x.id)) {
            var appo = ((x.count || 1) * 100) / (b.xps_count || 1);
            totB += appo;
          }
        });
        if (totA > totB) return -1;
        else return 1;
      });

      as.forEach((cur) => {
        cur.qualities?.sort((a, b) => b.count - a.count);
      });
    });
  }

  onSelect(activity: Activity): void {
    this.store.dispatch(new SetSelectedActivity(activity.id, '', []));
  }

  getNotification(evt: Event) {
    var x = evt as unknown as Search;
    this.store.dispatch(new GetActivitiesOverview(x)).subscribe(() => {
      this.indxTab = 0;
    });
  }
}
