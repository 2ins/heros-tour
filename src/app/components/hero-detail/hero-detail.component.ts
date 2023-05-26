import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddHero,
  DeleteHero,
  SetSelectedHero,
  UpdateHero,
} from '../../actions/hero.action';
import { Hero } from '../../model/hero';
import { HeroState } from '../../states/todo.state';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  //@Input() hero?: Hero;

  @Input()
  auxValueFromFather?: String;

  @ViewChild('createdAt') createdAt?: ElementRef;

  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;

  hero?: Hero;
  dt?: Date;

  @Output() upsertHeroEvent = new EventEmitter<Hero>();

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store
  ) {
    this.dt = new Date();
  }

  ngOnInit(): void {
    this.selectedHero?.subscribe((h) => {
      this.hero = h;
      this.dt = this.hero.created_at;
    });
    console.log('auxValueFromFather ', this.auxValueFromFather);
  }

  addHero(): void {
    this.hero = {} as Hero;
    this.store.dispatch(new SetSelectedHero(this.hero));
  }

  calculateTime() {
    alert('ciao');
    let time = new Date(this.createdAt?.nativeElement.value).getTime();
    let now = new Date().getTime();
    let msecperdays = 86400000;
    let days = Math.round((now - time) / msecperdays);
    console.log('time is: ', days);
  }

  //NGXS
  async updateHero(hero: Hero) {
    try {
      if (hero.id) {
        console.log('update hero called', hero);
        //TODO: add UpdateHero Action
        //await this.supabase.updateHero(hero);
        this.store.dispatch(new UpdateHero(hero));
      } else {
        this.store.dispatch(new AddHero(hero));
      }
      this.updatedHeroEmit(hero);
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

  //EVENT EMITTER just for learning purpose
  updatedHeroEmit(value: Hero) {
    this.upsertHeroEvent.emit(value);
  }
}
