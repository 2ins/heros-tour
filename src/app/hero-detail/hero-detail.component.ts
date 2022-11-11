import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddHero, DeleteHero } from '../actions/hero.action';
import { Hero } from '../hero';
import { HeroState } from '../states/todo.state';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  //@Input() hero?: Hero;

  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;

  hero?: Hero;

  @Output() newItemEvent = new EventEmitter<Hero>();

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.selectedHero?.subscribe((h) => {
      this.hero = h;
    });
  }

  addHero(): void {
    this.hero = {} as Hero;
  }

  addNewItem(value: Hero) {
    this.newItemEvent.emit(value);
  }

  async updateHero(hero: Hero) {
    try {
      if (hero.id) {
        //TODO: add UpdateHero Action
        await this.supabase.updateHero(hero);
      } else {
        this.store.dispatch(new AddHero(hero));
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
    }
  }

  async deleteHero(hero: Hero) {
    try {
      if (hero.id) {
        this.store.dispatch(new DeleteHero(hero));
      } else {
        this.hero = undefined;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
    }
  }
}
