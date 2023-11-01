import { Hero, HeroTable } from '../model/hero';
import { Search } from '../model/search';

export class AddExperienceTransaction {
  static readonly type = '[Hero] AddExperienceTransaction';
  constructor(public payload: HeroTable) {}
}

export class GetHeroes {
  static readonly type = '[Hero] Get';
}

export class UpdateHero {
  static readonly type = '[Hero] Update';
  constructor(public payload: Hero) {}
}

export class DeleteHero {
  static readonly type = '[Hero] Delete';
  constructor(public hero: Hero) {}
}

export class SetSelectedHero {
  static readonly type = '[Hero] Set';
  constructor(public payload: Hero) {}
}

export class SearchHeroes {
  static readonly type = '[Hero] Search';
  constructor(public search: Search) {}
}

export class GetHeroById {
  static readonly type = '[Hero] GetById';
  constructor(public id: string) {}
}

export class GetNewHeroTable {
  static readonly type = '[Hero] GetNewOneAdded';
  constructor() {}
}
