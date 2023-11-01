import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SearchHeroes, SetSelectedHero } from 'src/app/actions/hero.action';
import { Hero } from 'src/app/model/hero';
import { Quality } from 'src/app/model/quality';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
})
export class ExperiencesComponent implements OnInit {
  @Select(HeroState.getHeroList) heroes?: Observable<Hero[]>;
  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;

  myHero?: Hero;
  searchc: Search = { search: '', arr: [], location: '' };
  search: string = '';
  isMobile: boolean = false;
  indxTab: number = 0;

  @Input()
  session!: AuthSession;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router,
    private ms: MobileService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.selectedHero?.subscribe((h) => {
      if (h) {
        this.myHero = h;
      }
    });

    this.heroes?.subscribe((h) => {
      h?.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);
        return dateB.getTime() - dateA.getTime();
      });
    });

    console.log('searching');
    //this.store.dispatch(new SearchHeroes(this.searchc));
    console.log('done');
  }
  updateItem(q: Quality): void {
    console.log('dai: ', q);
    q.selected = !q.selected;
  }

  onSelect(hero: Hero): void {
    this.store.dispatch(new SetSelectedHero(hero));
    this.router.navigate(['/experiences/experience/', hero.id]);
  }

  getNotification(evt: Event) {
    this.searchc = evt as unknown as Search;
    this.store.dispatch(new SearchHeroes(this.searchc)).subscribe(() => {
      this.indxTab = 0;
    });
  }
}
