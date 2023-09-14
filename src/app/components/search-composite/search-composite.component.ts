import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { GetQualities } from 'src/app/actions/quality.action';
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
  search: string = '';
  hashMap = new Map<string, Quality[]>();
  virtuesList = VIRTUES_LIST;

  @Input()
  placeHolder?: string;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification() {
    var x = { search: this.search, arr: this.getArr() } as Search;
    this.notifyParent.emit(x);
  }

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.virtuesList.find((elem) => elem.id === 'WI'));
    this.qualities?.subscribe((qs) => {
      if (qs && qs.length != 0) {
        qs.forEach((e) => {
          e.selected = false;
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
}
