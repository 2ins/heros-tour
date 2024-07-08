import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SetUserProfile } from 'src/app/actions/profiles.action';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css'],
})
export class HomeSearchComponent implements OnInit {
  authenticated: boolean = false;
  isMobile: boolean = false;
  @Select(HeroState.getUserProfile) currentUser?: Observable<MyProfile>;
  @Select(HeroState.getActivitySearch) searchX?: Observable<Search>;

  profile: any = null;
  constructor(
    private readonly supabase: SupabaseService,
    private mobile: MobileService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isMobile = this.mobile.isMobile();
    this.loadUser();
  }

  async loadUser() {
    if (!this.profile) {
      this.profile = await this.getUser();
      this.store.dispatch(new SetUserProfile(this.profile));
    }
  }

  async signInWithGoogle() {
    this.supabase.signInWithProvider('google').then;
  }

  signOut() {
    this.supabase.signOut().then(() => {
      this.profile = null;
      this.store.dispatch(new SetUserProfile(this.profile));
    });
  }
  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabase.getUserSupabase();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data.user;
  }
  onUserClick(): void {
    this.router.navigate(['/users/user', this.profile.id]);
  }
}
