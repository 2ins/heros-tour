import { Search } from '../model/search';

export class SetActivitySearch {
  static readonly type = '[Search] SetActivitySearch';
  constructor(public payload: Search) {}
}
