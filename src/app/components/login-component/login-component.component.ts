// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from '@supabase/supabase-js';
import { SetUserProfile } from 'src/app/actions/profiles.action';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent {
  user: any = null;
  constructor(private supabaseService: SupabaseService, private store: Store) {}

  ngOnInit() {
    console.log('set prof 1');
    this.loadUser().then(() => {
      console.log('set prof 2');
    });
  }

  async loadUser() {
    this.user = await this.getUser();
    this.store.dispatch(new SetUserProfile(this.user));
    console.log('this.user: ', this.user);
  }

  async signInWithGoogle() {
    await this.supabaseService.signInWithProvider('google');
  }

  async signInWithGitHub() {
    await this.supabaseService.signInWithProvider('github');
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabaseService.getUserSupabase();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data.user;
  }

  async signOut() {
    await this.supabaseService.signOut();
  }
}
