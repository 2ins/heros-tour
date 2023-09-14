import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteHero,
  GetHeroById,
  SetSelectedHero,
} from 'src/app/actions/hero.action';
import { Hero } from 'src/app/model/hero';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile } from 'src/app/supabase.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css'],
})
export class ExperienceDetailComponent implements OnInit {
  @ViewChild('createdAt') createdAt?: ElementRef;

  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;
  @Select(HeroState.getUserProfile) currentUser?: Observable<MyProfile>;

  hero?: Hero;
  dt?: Date;
  editEnabled: boolean = false;

  experienceId?: any;
  isMobile: boolean = false;

  @Output() upsertHeroEvent = new EventEmitter<Hero>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private ms: MobileService,
    private location: Location
  ) {
    this.dt = new Date();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      this.experienceId = map.get('id') as string;
      console.log('1: experienceId?:' + this.experienceId);
      if (this.experienceId) {
        this.store.dispatch(new GetHeroById(this.experienceId));
      }
    });
    this.isMobile = this.ms.isMobile();

    this.selectedHero?.subscribe((h) => {
      console.log('2: this.selectedHero?.subscribe', h);
      this.hero = h;
      console.log('this hero', this.hero);
      this.dt = this.hero.created_at;
      h.profile_id;
      this.currentUser?.subscribe((cu) => {
        if (cu.id == h.profile_id) {
          this.editEnabled = true;
        } else {
          this.editEnabled = false;
        }
      });
    });
  }

  addHero(): void {
    this.hero = {} as Hero;
    this.store.dispatch(new SetSelectedHero(this.hero));
  }

  calculateTime() {
    let time = new Date(this.createdAt?.nativeElement.value).getTime();
    let now = new Date().getTime();
    let msecperdays = 86400000;
    let days = Math.round((now - time) / msecperdays);
    console.log('time is: ', days);
  }

  edit() {
    const appo = { experience: this.hero };
    this.route.navigateByUrl('/addnew', { state: appo });
  }

  deleteX() {
    if (
      confirm(
        this.hero?.name +
          '\n' +
          'Are you sure to delete thi experience ?\n' +
          'Once deleted it will not be possible to be restored.'
      )
    ) {
      this.deleteXp();
    }
  }

  deleteXp(): void {
    if (this.hero) {
      this.store.dispatch(new DeleteHero(this.hero)).subscribe(() => {
        console.log('BEFORE LAST');
        this.sleep(1500).then(() => this.location.back());
      });
    }
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
