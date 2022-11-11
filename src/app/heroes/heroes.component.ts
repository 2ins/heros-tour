import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { GetHeroes, SetSelectedHero } from '../actions/hero.action';
import { Hero } from '../hero';
import { HeroState } from '../states/todo.state';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  @Input()
  session!: AuthSession;

  @Select(HeroState.getHeroList) heroes?: Observable<Hero[]>;
  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;

  myHero?: Hero;

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
  }

  onSelect(hero: Hero): void {
    this.store.dispatch(new SetSelectedHero(hero));
  }

  addItem(newHero: Hero) {
    //this.store.dispatch(new GetHeroes());
  }
}
