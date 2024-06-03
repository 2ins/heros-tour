import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthSession, User } from '@supabase/supabase-js';
import { SetUserProfile } from 'src/app/actions/profiles.action';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  constructor(private supabase: SupabaseService, private store: Store) {
    if (this.supabase._session) this.session = this.supabase._session;
  }

  session?: AuthSession;
  user: any = null;

  ngOnInit(): void {
    this.loadUser().then(() => {
      this.store.dispatch(new SetUserProfile(this.user));
      console.log('USER:', this.user);
    });
  }

  async loadUser() {
    this.user = await this.getUser();
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabase.getUserSupabase();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data.user;
  }

  async signInWithGoogle() {
    this.supabase.signInWithProvider('google').then(() => {
      this.store.dispatch(new SetUserProfile(this.user));
      console.log('USER:', this.user);
    });
  }

  async signInWithGitHub() {
    await this.supabase.signInWithProvider('github');
  }

  signOut() {
    this.supabase.signOut().then(() => {
      this.user = null;
      this.store.dispatch(new SetUserProfile(this.user));
    });
  }
}
