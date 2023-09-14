import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { forkJoin, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AddActivity,
  GetActivitiesOverview,
  SetSelectedActivity,
} from '../actions/activity.action';
import {
  AddHero,
  AddHero2,
  AddNewHero,
  DeleteHero,
  GetHeroById,
  GetHeroes,
  SearchHeroes,
  SetSelectedHero,
  UpdateHero,
} from '../actions/hero.action';
import {
  AddMaster,
  GetMastersOverview,
  GetMastersOverviewSearch,
  SetSelectedMaster,
} from '../actions/master.action';
import {
  GetUsers,
  SetProfile,
  SetSelectedUser,
  SetUserProfile,
} from '../actions/profiles.action';
import { GetQualities } from '../actions/quality.action';
import { Activity } from '../model/activity';
import { Hero, HeroQualitiesTable, HeroTable } from '../model/hero';
import { Master, MasterActivityTable } from '../model/master';
import { Quality } from '../model/quality';
import { LoaderService } from '../services/loader.service';
import { MyProfile, SupabaseService } from '../supabase.service';

export class HeroStateModel {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  selectedMaster?: Master;
  qualities: Quality[] = [];
  masters: Master[] = [];
  profiles: MyProfile[] = [];
  selectedProfile?: MyProfile;
  activities: Activity[] = [];
  allActivities: Activity[] = [];
  selectedActivity?: Activity;
  userProfile?: MyProfile;
  newHeroTable?: HeroTable;
}

@State<HeroStateModel>({
  name: 'heroes',
  defaults: {
    heroes: [],
    selectedHero: undefined,
    qualities: [],
    masters: [],
    selectedMaster: undefined,
    profiles: [],
    selectedProfile: undefined,
    activities: [],
    allActivities: [],
    selectedActivity: undefined,
    userProfile: undefined,
  },
})
@Injectable()
export class HeroState {
  constructor(
    private supabase: SupabaseService,
    private loadingService: LoaderService
  ) {}

  @Selector()
  static getHeroList(state: HeroStateModel) {
    return state.heroes;
  }

  @Selector()
  static getSelectedHero(state: HeroStateModel) {
    return state.selectedHero;
  }

  @Selector()
  static getQualityList(state: HeroStateModel) {
    return state.qualities;
  }

  @Selector()
  static getMasterList(state: HeroStateModel) {
    return state.masters;
  }

  @Selector()
  static getSelectedMaster(state: HeroStateModel) {
    return state.selectedMaster;
  }

  @Selector()
  static getUsers(state: HeroStateModel) {
    return state.profiles;
  }

  @Selector()
  static getSelectedUser(state: HeroStateModel) {
    return state.selectedProfile;
  }

  @Selector()
  static getActivities(state: HeroStateModel) {
    return state.activities;
  }

  @Selector()
  static getSelectedActivity(state: HeroStateModel) {
    return state.selectedActivity;
  }
  @Selector()
  static getUserProfile(state: HeroStateModel) {
    return state.userProfile;
  }
  @Selector()
  static getAllActivities(state: HeroStateModel) {
    return state.allActivities;
  }
  @Selector()
  static getNewHeroTable(state: HeroStateModel) {
    return state.newHeroTable;
  }

  @Action(GetHeroes)
  getAllHeroes({ getState, setState }: StateContext<HeroStateModel>) {
    console.log('GetHeroes');
    this.loadingService.start();
    const query = this.supabase.getHeroes();
    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        console.log(result);
        this.loadingService.stop();

        var mapped = result?.map(function (obj) {
          return obj.j;
        });

        console.log(mapped);
        const state = getState();
        setState({
          ...state,
          heroes: mapped as unknown as Hero[],
        });
      })
    );
  }

  @Action(AddHero)
  addHero(
    { getState, patchState, setState }: StateContext<HeroStateModel>,
    { payload }: AddHero
  ) {
    this.loadingService.start();
    const insert = this.supabase.getAddHero(payload);
    return from(insert.select('*')).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        if (result) {
          const newHero = result[0] as Hero;
          patchState({
            heroes: [...state.heroes, newHero],
            selectedHero: newHero,
          });
        }
      })
    );
  }

  /*
  @Action(AddHero2)
  addHero2(
    { getState, patchState, setState }: StateContext<HeroStateModel>,
    { payload }: AddHero2
  ) {
    var pippo = payload.arr;
    payload.arr = undefined;
    var insert;
    console.log('START BIZ', pippo);

    if (!payload.id) {
      insert = this.supabase.getAddHeroTable(payload);
    } else {
      insert = this.supabase.getUpdateHeroTable(payload);
    }
    insert.select('id').then(({ data }) => {
      console.log('data', data);
      this.appoXXX(data, payload, pippo);
    });
  }

  appoXXX(result: any, payload: HeroTable, pippo: any) {
    var newIdHero;
    if (result) {
      newIdHero = result[0].id;
      console.log();
      if (payload.id) {
        console.log('HO UN ID', payload.id);
        const d = this.supabase
          .deleteHeroQuality(payload.id)
          .then(({ data }) => {
            console.log('HO CANCELLATO');
            if (pippo) {
              console.log('INSERISCO LE QS', pippo);
              this.insertExperienceQualities(pippo, payload.id);
            }
          });
      } else {
        console.log('NON HO UN ID', payload.id);
        if (pippo) {
          this.insertExperienceQualities(pippo, newIdHero);
        }
      }
    }
    return;
  }
  */

  @Action(AddHero2)
  addHero2(
    { getState, patchState, setState }: StateContext<HeroStateModel>,
    { payload }: AddHero2
  ) {
    this.loadingService.start();
    var pippo = payload.arr;
    payload.arr = undefined;
    var insert;
    console.log('START BIZ', pippo);

    if (!payload.id) {
      insert = this.supabase.getAddHeroTable(payload);
    } else {
      insert = this.supabase.getUpdateHeroTable(payload);
    }
    return from(insert.select('id')).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        var newIdHero;
        if (result) {
          newIdHero = result[0].id;
          if (payload.id) {
            console.log('HO UN ID', payload.id);
            const d = this.supabase
              .deleteHeroQuality(payload.id)
              .then(({ data }) => {
                console.log('HO CANCELLATO');
                if (pippo) {
                  console.log('INSERISCO LE QS', pippo);
                  this.insertExperienceQualities(pippo, payload.id);
                }
              });
          } else {
            console.log('NON HO UN ID', payload.id);
            if (pippo) {
              this.insertExperienceQualities(pippo, newIdHero);
              payload.id = newIdHero;
            }
          }
          const state = getState();
          setState({
            ...state,
            newHeroTable: payload,
          });
        }
        console.log('ENDO OF BIZ', pippo);
      })
    );
  }

  insertExperienceQualities(pippo: HeroQualitiesTable[], newIdHero: any) {
    var httpCalls: any = [];
    this.loadingService.start();
    pippo.forEach((hq) => {
      hq.hero_id = newIdHero;
      httpCalls.push(from(this.supabase.insertHeroQuality(hq)));
    });
    forkJoin(httpCalls).subscribe((response: any) => {
      this.loadingService.stop();
      response.forEach((r: any) => {
        r.data.map(function (obj: any) {
          console.log('id', obj);
        });
      });
    });
  }

  @Action(SetSelectedHero)
  setSelectedHeroId(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: SetSelectedHero
  ) {
    const state = getState();
    console.log('payload', payload);
    setState({
      ...state,
      selectedHero: payload,
    });
  }

  @Action(AddNewHero)
  addNewHero({ getState, setState }: StateContext<HeroStateModel>) {
    const state = getState();
    setState({
      ...state,
      selectedHero: {} as Hero,
    });
  }

  @Action(DeleteHero)
  deleteTodo(
    { getState, setState }: StateContext<HeroStateModel>,
    { hero }: DeleteHero
  ) {
    this.loadingService.start();
    return from(this.supabase.deleteHero(hero)).pipe(
      tap(() => {
        this.loadingService.stop();
        const state = getState();
        const filteredArray = state.heroes.filter(
          (item) => item.id !== hero.id
        );
        setState({
          ...state,
          heroes: filteredArray,
          selectedHero: undefined,
        });
      })
    );
  }

  @Action(UpdateHero)
  updateTodo(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: UpdateHero
  ) {
    this.loadingService.start();
    //return from(this.supabase.updateHero(payload).select('*')).pipe(
    return from(this.supabase.getUpdateHeroGeom(payload).select('*')).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        const heroList = [...state.heroes];
        const todoIndex = heroList.findIndex((item) => item.id === payload.id);
        if (result != null) {
          const newHero = result[0] as unknown as Hero;
          heroList[todoIndex] = newHero;
          setState({
            ...state,
            heroes: heroList,
            selectedHero: newHero,
          });
        }
      })
    );
  }

  @Action(SearchHeroes)
  searchHeroes(
    { getState, setState }: StateContext<HeroStateModel>,
    { search }: SearchHeroes
  ) {
    this.loadingService.start();
    console.log('aoooo');
    const query = this.supabase.getHeroesSearch(search.search, search.arr);
    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        console.log(result);
        var mapped = result?.map(function (obj) {
          return obj.j;
        });
        console.log(mapped);
        const state = getState();
        setState({
          ...state,
          heroes: mapped as unknown as Hero[],
          selectedHero: undefined,
        });
      })
    );
  }

  @Action(GetHeroById)
  getHeroById(
    { getState, setState }: StateContext<HeroStateModel>,
    { id }: GetHeroById
  ) {
    this.loadingService.start();
    const query = this.supabase.getHeroById(id);
    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        var ar = result as any[];
        console.log('SETTETE');
        const state = getState();
        setState({
          ...state,
          selectedHero: ar[0] as unknown as Hero,
        });
      })
    );
  }

  @Action(GetQualities)
  getAllQualities({ getState, setState }: StateContext<HeroStateModel>) {
    this.loadingService.start();
    const query = this.supabase.getAllQualities();

    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        var mapped = result?.map(function (obj) {
          return obj.j;
        });

        const state = getState();

        setState({
          ...state,
          qualities: mapped as Quality[],
        });
      })
    );
  }

  @Action(GetMastersOverview)
  getAllMastersOverview({ getState, setState }: StateContext<HeroStateModel>) {
    this.loadingService.start();
    const query = this.supabase.getMasterOverview();

    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        var mapped = result?.map(function (obj) {
          return obj.j;
        });
        setState({
          ...state,
          masters: mapped as Master[],
        });
      })
    );
  }

  @Action(GetMastersOverviewSearch)
  getMastersOverviewSearch(
    { getState, setState }: StateContext<HeroStateModel>,
    { search }: GetMastersOverviewSearch
  ) {
    this.loadingService.start();
    const query = this.supabase.getMasterOverviewSearch(search);
    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        var mapped = result?.map(function (obj) {
          return obj.j;
        });
        setState({
          ...state,
          masters: mapped as Master[],
        });
      })
    );
  }

  @Action(SetSelectedMaster)
  setSelectedMaster(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: SetSelectedMaster
  ) {
    this.loadingService.start();
    var idMaster: number = payload;
    const queryMaster = this.supabase.getMasterById(idMaster);
    const queryExperiences = this.supabase.getMasterHeroes(idMaster);
    return forkJoin([from(queryMaster), from(queryExperiences)]).subscribe(
      (response: any) => {
        this.loadingService.stop();
        var selMast = response[0].data[0] as Master;
        var mapped = response[1].data.map(function (obj: any) {
          return obj.j;
        });
        selMast.heroes = mapped;
        const state = getState();
        setState({
          ...state,
          selectedMaster: selMast,
        });
      }
    );
  }

  @Action(AddMaster)
  AddMaster(
    { getState, patchState, setState }: StateContext<HeroStateModel>,
    { payload }: AddMaster
  ) {
    this.loadingService.start();
    var pippo = payload.arr;
    payload.arr = undefined;
    const insert = this.supabase.addMaster(payload);
    //va in inserimento o aggiornamento
    return from(insert.select('*')).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        if (result) {
          const newId = result[0].id;
          var httpCalls: any = [];
          //se ho gia un id dal payload allora sono in aggiornamento
          //vado a cancellare tutte le attivita legate al masteer dalla tabella masterActivities
          if (payload.id) {
            console.log('HO UN ID, ', payload.id);
            const d = this.supabase
              .deleteMasterActivity(payload.id)
              .then(({ data }) => {
                //inserire nella tabella masterActivities
                if (pippo) {
                  this.insertMasterActivities(pippo, httpCalls, newId);
                }
              });
          } else {
            console.log('NON HO UN ID, ', payload.id);
            //altrimenti inserisco senza scancellare
            if (pippo) {
              this.insertMasterActivities(pippo, httpCalls, newId);
            }
          }
        }
      })
    );
  }

  insertMasterActivities(
    pippo: MasterActivityTable[],
    httpCalls: any,
    newId: any
  ) {
    this.loadingService.start();
    pippo.forEach((hq) => {
      hq.id_master = newId;
      httpCalls.push(from(this.supabase.addMasterActivity(hq)));
    });
    forkJoin(httpCalls).subscribe((response: any) => {
      this.loadingService.stop();
      response.forEach((r: any) => {
        r.data.map(function (obj: any) {});
      });
    });
  }

  @Action(AddActivity)
  AddActivity(
    { getState, patchState, setState }: StateContext<HeroStateModel>,
    { payload }: AddActivity
  ) {
    this.loadingService.start();
    const insert = this.supabase.addActivity(payload);
    return from(insert.select('*')).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        if (result) {
          const newId = result[0].id;
        }
      })
    );
  }

  @Action(GetUsers)
  getAllUsers(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: GetUsers
  ) {
    this.loadingService.start();
    const query = this.supabase.getUsers(payload);

    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        var mapped = result?.map(function (obj) {
          return obj.j;
        });
        setState({
          ...state,
          profiles: mapped as MyProfile[],
        });
      })
    );
  }

  @Action(SetSelectedUser)
  SetSelectedUser(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: SetSelectedUser
  ) {
    this.loadingService.start();
    var id = payload;
    console.log('id: ', id);
    console.log('hai chiamat');

    const qExperiences = this.supabase.getUserExperiences(id);
    const qUser = this.supabase.getUserById(id);

    return forkJoin([from(qUser), from(qExperiences)]).subscribe(
      (response: any) => {
        this.loadingService.stop();
        var selectedUser = response[0].data[0] as MyProfile;
        var mapped = response[1].data.map(function (obj: any) {
          return obj.j;
        });
        selectedUser.heroes = mapped;
        const state = getState();
        setState({
          ...state,
          selectedProfile: selectedUser,
        });
      }
    );
  }
  //selectedProfile: payload,
  @Action(GetActivitiesOverview)
  GetActivitiesOverview(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: GetActivitiesOverview
  ) {
    this.loadingService.start();
    const query = this.supabase.getActivitiesOverview(payload);

    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        const state = getState();
        var mapped = result?.map(function (obj) {
          return obj.j;
        });
        setState({
          ...state,
          activities: mapped as Activity[],
        });
      })
    );
  }

  @Action(SetSelectedActivity)
  SetSelectedActivity(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: SetSelectedActivity
  ) {
    this.loadingService.start();
    const queryMasters = this.supabase.getMastersOfActivity(payload);
    const queryActivity = this.supabase.getActivityOverviewXP(payload);

    return forkJoin([from(queryMasters), from(queryActivity)]).subscribe(
      (response: any) => {
        this.loadingService.stop();
        var selectedAct = response[1].data[0] as Activity;
        var mapped = response[0].data.map(function (obj: any) {
          return obj.j;
        });
        selectedAct.masters = mapped;
        const state = getState();
        setState({
          ...state,
          selectedActivity: selectedAct,
        });
      }
    );
  }

  @Action(SetUserProfile)
  SetUserProfile(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: SetUserProfile
  ) {
    this.loadingService.start();
    var prof = this.supabase.profile(payload);

    return from(prof).pipe(
      tap(({ data: result, error, status }) => {
        this.loadingService.stop();
        console.log('data profile:', result);
        const state = getState();

        setState({
          ...state,
          userProfile: result as MyProfile,
        });
      })
    );
  }

  @Action(SetProfile)
  SetProfile(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: SetProfile
  ) {
    this.loadingService.start();
    var prof = this.supabase.updateProfile(payload);

    return from(prof).pipe(
      tap(({ data: result, error, status }) => {
        console.log('data profile:', result);
        const state = getState();
        this.loadingService.stop();
        setState({
          ...state,
          userProfile: payload,
        });
      })
    );
  }
}
