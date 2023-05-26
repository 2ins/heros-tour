//MASTERS

import { MasterTable } from '../model/master';
import { Search } from '../model/search';

export class GetMasters {
  static readonly type = '[Master] Get';
}

export class GetMastersOverview {
  static readonly type = '[Master] GetOverview';
}

export class SetSelectedMaster {
  static readonly type = '[Master] Set';
  constructor(public payload: number) {}
}

export class GetMastersOverviewSearch {
  static readonly type = '[Master] Search';
  constructor(public search: Search) {}
}
export class AddMaster {
  static readonly type = '[Master] Add';
  constructor(public payload: MasterTable) {}
}
