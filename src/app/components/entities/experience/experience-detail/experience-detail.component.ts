import { DOCUMENT, Location } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
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
import { NavigationHistoryService } from 'src/app/services/navigation-history-service.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css'],
})
export class ExperienceDetailComponent implements OnInit {
  @ViewChild('createdAt') createdAt?: ElementRef;
  @ViewChild('scrollTargetx') scrollTarget!: ElementRef;

  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;
  @Select(HeroState.getUserProfile) currentUser?: Observable<MyProfile>;

  hero?: Hero;
  dt?: Date;
  editEnabled: boolean = false;
  theCurrentUser?: MyProfile;

  experienceId?: any;
  qidSelected?: any;
  isMobile: boolean = false;

  @Output() upsertHeroEvent = new EventEmitter<Hero>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private ms: MobileService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,
    private navigationHistoryService: NavigationHistoryService,
    private scroller: ScrollService,
    private supabase: SupabaseService
  ) {
    this.dt = new Date();
    this.document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    // Subscription
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.experienceId = paramMap.get('id') as string; // Ensure 'hero_id' matches your actual parameter name

      this.activatedRoute.queryParamMap.subscribe((queryParamMap) => {
        this.qidSelected = queryParamMap.get('qid') as string;

        if (this.experienceId) {
          this.store.dispatch(new GetHeroById(this.experienceId));
        }
      });
    });
    this.isMobile = this.ms.isMobile();

    this.selectedHero?.subscribe((h) => {
      this.hero = h;
      this.dt = this.hero.created_at;
      if (this.supabase._session?.user.id == h.profile_id) {
        this.editEnabled = true;
      }
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

  backClicked() {
    this.location.back();
  }
}
