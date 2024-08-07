//ACTIVITIES

import { ActivityTable } from '../model/activity';
import { Search } from '../model/search';

export class GetActivitiesOverview {
  static readonly type = '[Activity] GetOverview';
  constructor(public payload: Search) {}
}
export class GetAllActivities {
  static readonly type = '[Activity] GetAllActivities';
  constructor() {}
}
export class SetSelectedActivity {
  static readonly type = '[Activity] SetSelected';
  constructor(
    public payload: number,
    public loc: string,
    public qualities?: number[]
  ) {}
}
export class AddActivity {
  static readonly type = '[Activity] Add';
  constructor(public payload: ActivityTable) {}
}
