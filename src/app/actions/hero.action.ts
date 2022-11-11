import { Hero } from '../hero';

export class AddHero {
  static readonly type = '[Hero] Add';
  constructor(public payload: Hero) {}
}

export class GetHeroes {
  static readonly type = '[Hero] Get';
}

export class UpdateHero {
  static readonly type = '[Hero] Update';
  constructor(public payload: Hero, public id: number) {}
}

export class DeleteHero {
  static readonly type = '[Hero] Delete';
  constructor(public hero: Hero) {}
}

export class SetSelectedHero {
  static readonly type = '[Hero] Set';
  constructor(public payload: Hero) {}
}

export class AddNewHero {
  static readonly type = '[Hero] Add';
  constructor() {}
}
