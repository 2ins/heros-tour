import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Hero } from './hero';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  getProfiles() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`);
  }

  //HEROES
  getAllHeros() {
    return this.supabase.from('heroes').select(`id, name`).order('id');
  }

  updateHero(hero: Hero) {
    return this.supabase.from('heroes').upsert(hero);
  }

  insertHero(hero: Hero) {
    return this.supabase.from('heroes').insert(hero);
  }

  deleteHero(hero: Hero) {
    return this.supabase.from('heroes').delete().match({ id: hero.id });
  }

  //NGXS

  getHeroesHelp() {
    return this.supabase.from('heroes').select(`id, name`).order('id');
  }

  getHeroHelp(id: number) {
    return this.supabase.from('heroes').select(`id, name`).match({ id: id });
  }

  getAddHero(hero: Hero) {
    return this.supabase.from('heroes').insert(hero);
  }

  getDeleteHero(hero: Hero) {
    return this.supabase.from('heroes').delete().match({ id: hero.id });
  }
}
