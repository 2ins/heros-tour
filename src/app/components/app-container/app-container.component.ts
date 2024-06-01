import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable, filter } from 'rxjs';
import { SetUserProfile } from 'src/app/actions/profiles.action';
import { GetQualities } from 'src/app/actions/quality.action';
import { Quality } from 'src/app/model/quality';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css'],
})
export class AppContainerComponent implements OnInit {
  @Select(HeroState.getActivitySearch) searchX?: Observable<Search>;
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  @Input()
  session!: AuthSession;

  isMobile: boolean = false;
  isTablet: boolean = false;
  showComponent: boolean = true;

  constructor(
    private supabase: SupabaseService,
    private store: Store,
    public mobileService: MobileService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.showComponent = event.url !== '/addnew';
      });

    if (this.session) {
      console.log('SESSION MAIL', this.session.user.email);
      console.log('SESSION ID', this.session.user.id);
      this.store.dispatch(new SetUserProfile(this.session.user));
      console.log('user', this.session.user);
    } else {
    }
    this.isMobile = this.mobileService.isMobile();
    this.isTablet = this.mobileService.isTablet();
    this.searchX?.subscribe((x) => {
      console.log('search: ', x.search);
    });

    this.qualities?.subscribe((e) => {
      if (e.length == 0) {
        this.store.dispatch(new GetQualities());
      }
    });
  }

  onLogOut(): void {
    console.log('sign out', this.session.user.email);
    this.supabase.signOut();
  }
  backClicked() {
    this.location.back();
  }
}
