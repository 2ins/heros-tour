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
import { Activity, ActivityTable } from './model/activity';
import { Hero, HeroQualitiesTable, HeroTable } from './model/hero';
import { MasterActivityTable, MasterTable } from './model/master';
import { Quality } from './model/quality';
import { Search } from './model/search';
export interface MyProfile {
  id: string;
  username: string;
  website: string;
  avatar_url: string;

  qualities?: Quality[];
  tot_xps?: number;
  heroes?: Hero[];
  activities?: Activity[];
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

  //AUTHENTICATIONS
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url, id`)
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

  //

  //

  //

  //

  //

  //

  async upload(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file);

    return { data, error };
  }

  async download(bucket: string, path: string) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(path);

    return { data, error };
  }

  //

  //

  //

  //

  //PROFILE
  updateProfile(profile: MyProfile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }
  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }
  //NOT USED
  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
  //NOT USED
  getProfiles() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`);
  }

  //HEROES
  //NOT USED
  getAllHeros() {
    return this.supabase
      .from('heroes')
      .select(
        `id, name, event_date, profile_id, hero_qualities(*), qualities(*)`
      )
      .order('id');
  }
  //NOT USED
  updateHero(hero: Hero) {
    return this.supabase.from('heroes').upsert(hero);
  }

  insertHero(hero: HeroTable) {
    return this.supabase.from('heroes').upsert(hero);
  }

  //* in NGXS
  deleteHero(hero: Hero) {
    return this.supabase.from('heroes').delete().match({ id: hero.id });
  }

  insertHeroQuality(hq: HeroQualitiesTable) {
    return this.supabase.from('hero_qualities').insert(hq).select('id');
  }
  deleteHeroQuality(id: number) {
    return this.supabase.from('hero_qualities').delete().match({ hero_id: id });
  }

  getHeroById(idHero: string) {
    return this.supabase
      .from('overview_experiences')
      .select(`*`)
      .eq('id', idHero);
  }

  //

  //

  //

  //

  //

  //NGXS

  //search heroes with parameters
  getHeroesSearch(ss: string, lista: number[], loc: string) {
    console.log('im calling func_search_experiences_loc');
    return this.supabase.rpc('func_search_experiences_loc', {
      arr: lista,
      loc: loc,
      search: ss,
    });
  }

  //search heroes no parameters
  getHeroes() {
    return this.supabase.rpc('jtest_geom');
  }

  //add new experience. idProfile already present
  //SUPABASE: addGeometry to add in tabel hero the geo loc corrdinates
  getAddHero(hero: Hero) {
    const idProfile = this._session?.user.id;
    console.log('idProfile', idProfile);
    console.log('getAddHero', hero);
    return this.supabase.rpc('addgeomerty', {
      lon: hero.geom?.coordinates[0],
      lat: hero.geom?.coordinates[1],
      namehero: hero.name,
      eventdate: hero.event_date,
      profileid: idProfile,
    });
    //return this.supabase.from('heroes').insert(hero);
  }

  //update the experience.
  //SUPABASE: updategeomerty_2 to update in table hero the geo loc corrdinates
  getUpdateHeroGeom(hero: Hero) {
    return this.supabase.rpc('updategeomerty_2', {
      lon: hero.geom?.coordinates[0],
      lat: hero.geom?.coordinates[1],
      namehero: hero.name,
      idhero: hero.id,
      eventdate: hero.event_date,
    });
    //return this.supabase.from('heroes').insert(hero);
  }

  //add new experience. idProfile already present
  //SUPABASE: addGeometry to add in tabel hero the geo loc corrdinates
  getAddHeroTable(hero: HeroTable) {
    const idProfile = this._session?.user.id;
    console.log('idProfile', idProfile);
    console.log('getAddHero', hero);
    return this.supabase.rpc('addgeomerty', {
      lon: hero.geom?.coordinates[0],
      lat: hero.geom?.coordinates[1],
      namehero: hero.name,
      eventdate: hero.event_date,
      profileid: idProfile,
      masterid: hero.master_id,
      loc: hero.location,
    });
    //return this.supabase.from('heroes').insert(hero);
  }

  //update the experience.
  //SUPABASE: updategeomerty_2 to update in table hero the geo loc corrdinates
  getUpdateHeroTable(hero: HeroTable) {
    return this.supabase.rpc('updategeomerty_2', {
      lon: hero.geom?.coordinates[0],
      lat: hero.geom?.coordinates[1],
      namehero: hero.name,
      idhero: hero.id,
      eventdate: hero.event_date,
      loc: hero.location,
    });
    //return this.supabase.from('heroes').insert(hero);
  }

  getAddExperienceTransaction(hero: HeroTable) {
    return this.supabase.rpc('upsert_hero_and_qualities', {
      hero_data: hero,
    });
  }

  //

  //

  //

  //QUALITY
  getAllQualities() {
    //return this.supabase.from('qualities').select('*').order('id');
    return this.supabase.rpc('getqualitiesactivities');
  }

  //NOT USED
  getQuality(idq: number) {
    return this.supabase.from('qualities').select('*').match({ id: idq });
  }

  //

  //

  //

  //MASTERS
  getMasterOverview() {
    return this.supabase.rpc('getmasteroverview');
  }

  getMasterOverviewSearch(searchMaster: Search) {
    console.log('searchMaster', searchMaster);
    return this.supabase.rpc('func_search_masters_loc', {
      search: searchMaster.search,
      arr: searchMaster.arr,
      loc: searchMaster.location,
    });
  }

  //get all heroes of the master
  getMasterHeroes(idMaster: number) {
    return this.supabase.rpc('jtest_geom3', { masterid: idMaster });
  }
  getMasterById(idMaster: number) {
    return this.supabase
      .from('overview_masters')
      .select(`*`)
      .eq('id', idMaster);
  }
  addMaster(master: MasterTable) {
    const idProfile = this._session?.user.id;
    return this.supabase.from('masters').upsert(master);
  }
  addMasterActivity(ma: MasterActivityTable) {
    const idProfile = this._session?.user.id;
    return this.supabase.from('master_activities').insert(ma);
  }
  deleteMasterActivity(idMaster: number) {
    return this.supabase
      .from('master_activities')
      .delete()
      .match({ id_master: idMaster });
  }
  //

  //

  //

  //USERS
  getUsers(searchUser: string) {
    if (searchUser == undefined || searchUser == '') {
      return this.supabase.rpc('getusers');
    } else {
      return this.supabase.rpc('getuserssearch', { search: searchUser });
    }
  }

  getUserById(idUser: string) {
    return this.supabase.from('overview_users').select(`*`).eq('id', idUser);
  }

  getUserExperiences(idProfile: string) {
    return this.supabase.rpc('jtest_geom4', { profileid: idProfile });
  }

  //ACTIVITIES
  getActivitiesOverview(searchActivity: Search) {
    return this.supabase.rpc('func_search_activities_loc', {
      search: searchActivity.search,
      arr: searchActivity.arr,
      loc: searchActivity.location,
    });
  }

  //ACTIVITIES
  getActivityOverview(idActivity: number) {
    return this.supabase.rpc('getactivityoverviewbyid', {
      activityid: idActivity,
    });
  }

  //get all heroes of the master
  getActivityHeroes(idActivity: number) {
    return this.supabase.rpc('???', { activityID: idActivity });
  }
  //get all heroes of the master
  getMastersOfActivity(idActivity: number) {
    return this.supabase.rpc('getmastersbyactivity', {
      activityid: idActivity,
    });
  }

  getActivityOverviewXP(idAct: number) {
    return this.supabase
      .from('overview_activities')
      .select(`*`)
      .eq('id', idAct);
  }

  addActivity(act: ActivityTable) {
    return this.supabase.from('activities').upsert(act);
  }

  getAllLocations() {
    return this.supabase.rpc('getlocationall');
  }
  getAggLocations() {
    return this.supabase.rpc('getagglocation');
  }
  getAggLocationsCombo() {
    return this.supabase.rpc('getaggcombolocation');
  }
  getAllActivities() {
    return this.supabase.from('activities').select('*');
  }
  getLocationsByMaster(idMaster: number) {
    return this.supabase.rpc('func_find_locations_by_master', {
      masterid: idMaster,
    });
  }
}
