import { Activity } from './activity';
import { Hero } from './hero';
import { Quality } from './quality';

export interface Master {
  id: number;
  created_at?: Date;
  name: string;
  website: string;
  qualities?: Quality[];
  tot_xps?: number;
  heroes?: Hero[];
  activities?: Activity[];
  avatar_url: string;
}
export interface MasterTable {
  id?: number;
  created_at?: Date;
  name: string;
  website: string;
  avatar_url: string;
  arr?: MasterActivityTable[];
}

export interface MasterActivityTable {
  id_master?: number;
  id_activity: number;
}
