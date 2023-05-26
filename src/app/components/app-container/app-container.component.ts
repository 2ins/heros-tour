import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { SetUserProfile } from 'src/app/actions/profiles.action';
import { MobileService } from 'src/app/services/mobile.service';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css'],
})
export class AppContainerComponent implements OnInit {
  @Input()
  session!: AuthSession;

  isMobile: boolean = false;
  isTablet: boolean = false;

  constructor(
    private supabase: SupabaseService,
    private store: Store,
    public mobileService: MobileService,
    private location: Location
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
  }

  onLogOut(): void {
    console.log('sign out', this.session.user.email);
    this.supabase.signOut();
  }
  backClicked() {
    this.location.back();
  }
}
