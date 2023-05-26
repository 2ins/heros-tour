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
import { SetSelectedHero } from 'src/app/actions/hero.action';
import { Hero } from 'src/app/model/hero';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { Profile } from 'src/app/supabase.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css'],
})
export class ExperienceDetailComponent implements OnInit {
  @ViewChild('createdAt') createdAt?: ElementRef;

  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;
  @Select(HeroState.getUserProfile) currentUser?: Observable<Profile>;

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
    private ms: MobileService
  ) {
    this.dt = new Date();
  }

  ngOnInit(): void {
    this.isMobile = false;
    this.selectedHero?.subscribe((h) => {
      this.hero = h;
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

    this.activatedRoute.paramMap.subscribe((map) => {
      this.experienceId = map.get('id');
      console.log('experienceId?:' + this.experienceId);
      if (this.experienceId) {
        //this.store.dispatch(new SetSelectedHero(this.experienceId));
      }
    });
    console.log('hero?:' + this.hero);
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
    console.log('prima', appo);
    this.route.navigateByUrl('/addnew', { state: appo });
  }
}
