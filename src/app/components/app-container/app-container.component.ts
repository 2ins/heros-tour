import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SetUserProfile } from 'src/app/actions/profiles.action';
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
  @Input()
  session!: AuthSession;

  isMobile: boolean = false;
  isTablet: boolean = false;

  constructor(
    private supabase: SupabaseService,
    private store: Store,
    public mobileService: MobileService,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
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
  }

  onLogOut(): void {
    console.log('sign out', this.session.user.email);
    this.supabase.signOut();
  }
  backClicked() {
    this.location.back();
  }
}
