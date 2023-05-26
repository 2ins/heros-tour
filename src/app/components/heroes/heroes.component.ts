import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { Search } from 'src/app/model/search';
import {
  GetHeroes,
  SearchHeroes,
  SetSelectedHero,
} from '../../actions/hero.action';
import { Hero } from '../../model/hero';
import { HeroState } from '../../states/todo.state';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  @Select(HeroState.getHeroList) heroes?: Observable<Hero[]>;
  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;

  myHero?: Hero;
  search: Search = { search: '', arr: [] };

  @Input()
  session!: AuthSession;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetHeroes());

    this.selectedHero?.subscribe((h) => {
      if (h) {
        this.myHero = h;
      }
    });

    console.log('SESSION EMAIL', this.session.user.email);
  }

  onSelect(hero: Hero): void {
    this.store.dispatch(new SetSelectedHero(hero));
  }

  onSearch(): void {
    this.store.dispatch(new SearchHeroes(this.search));
  }

  onHeroUpdate(hero: Hero) {
    console.log('action emitted intercept: hero id: ', hero.id);
    console.log('hero', hero);
  }
}
