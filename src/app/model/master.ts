import { Activity, ActivityTable } from './activity';
import { Hero } from './hero';
import { LocationAggDbItem } from './location';
import { Quality } from './quality';

export interface Master {
  id: number;
  created_at?: Date;
  name: string;
  website: string;
  qualities?: Quality[];
  tot_xps?: number;
  heroes?: Hero[];
  locations?: LocationAggDbItem[];
  activities?: Activity[];
  avatar_url: string;
  resume?: Resume[];
}
export interface MasterTable {
  id?: number;
  created_at?: Date;
  name: string;
  website: string;
  avatar_url: string;
  arr?: MasterActivityTable[];
  preselectedActivities?: ActivityTable[];
  preselectedActivitiesCopy?: ActivityTable[];
}

export interface MasterActivityTable {
  id_master?: number;
  id_activity: number;
}

export interface Resume {
  id: number;
  name: string;
  description: string;
}
