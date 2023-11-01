//MASTERS

import { MasterTable } from '../model/master';
import { Search } from '../model/search';

export class GetMasters {
  static readonly type = '[Master] Get';
}

export class GetMastersOverview {
  static readonly type = '[Master] GetOverview';
}

export class GetAllMastersList {
  static readonly type = '[Master] GetAllMastersList';
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

export class SetAddedMaster {
  static readonly type = '[Master] SetAddedMaster';
  constructor(public payload: MasterTable) {}
}

export class GetLocationByMaster {
  static readonly type = '[Locations] GetLocationByMaster';
  constructor(public payload: number) {}
}
