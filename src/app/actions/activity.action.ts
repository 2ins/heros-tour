//ACTIVITIES

import { ActivityTable } from '../model/activity';
import { Search } from '../model/search';

export class GetActivitiesOverview {
  static readonly type = '[Activity] GetOverview';
  constructor(public payload: Search) {}
}
export class SetSelectedActivity {
  static readonly type = '[Activity] SetSelected';
  constructor(public payload: number) {}
}
export class AddActivity {
  static readonly type = '[Activity] Add';
  constructor(public payload: ActivityTable) {}
}
