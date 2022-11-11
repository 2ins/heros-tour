import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AddHero,
  AddNewHero,
  DeleteHero,
  GetHeroes,
  SetSelectedHero,
} from '../actions/hero.action';
import { Hero } from '../hero';
import { SupabaseService } from '../supabase.service';

export class HeroStateModel {
  heroes: Hero[] = [];
  selectedHero?: Hero;
}

@State<HeroStateModel>({
  name: 'heroes',
  defaults: {
    heroes: [],
    selectedHero: undefined,
  },
})
@Injectable()
export class HeroState {
  constructor(private supabase: SupabaseService) {}

  @Selector()
  static getHeroList(state: HeroStateModel) {
    return state.heroes;
  }

  @Selector()
  static getSelectedHero(state: HeroStateModel) {
    return state.selectedHero;
  }

  //la action e' raggiungibile tramite GetHeroes...
  //per esempio su ngOnInit() -> this.store.dispatch(new GetTodos());
  //dunque todos = this.todoService.fetchTodos()
  //getState e setState : servono a ?
  @Action(GetHeroes)
  getAllHeroes({ getState, setState }: StateContext<HeroStateModel>) {
    const query = this.supabase.getHeroesHelp();
    return from(query).pipe(
      tap(({ data: result, error, status }) => {
        const state = getState();
        setState({
          ...state,
          heroes: result as Hero[],
        });
      })
    );
  }

  @Action(AddHero)
  addHero(
    { getState, patchState, setState }: StateContext<HeroStateModel>,
    { payload }: AddHero
  ) {
    const insert = this.supabase.getAddHero(payload);
    console.log(payload);
    return from(insert.select('*')).pipe(
      tap(({ data: result, error, status }) => {
        const state = getState();
        if (result) {
          console.log('result', result[0]);

          const newHero = result[0] as Hero;

          console.log('newHero', newHero);
          patchState({
            heroes: [...state.heroes, newHero],
          });

          console.log('state.selectedHero :', state);
        }
      })
    );
  }
  @Action(SetSelectedHero)
  setSelectedHeroId(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: SetSelectedHero
  ) {
    const state = getState();
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
    return from(this.supabase.deleteHero(hero)).pipe(
      tap(() => {
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
  /*
  @Action(UpdateTodo)
  updateTodo(
    { getState, setState }: StateContext<TodoStateModel>,
    { payload, id }: UpdateTodo
  ) {
    return this.todoService.updateTodo(payload, id).pipe(
      tap((result) => {
        const state = getState();
        const todoList = [...state.todos];
        const todoIndex = todoList.findIndex((item) => item.id === id);
        todoList[todoIndex] = result;
        setState({
          ...state,
          todos: todoList,
        });
      })
    );
  }

  

  
  */
}
