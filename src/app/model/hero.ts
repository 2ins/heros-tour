import { Profile } from '../supabase.service';
import { Activity } from './activity';
import { Geom } from './geom';
import { Master } from './master';
import { Quality } from './quality';

export interface Hero {
  id: number;
  name: string;
  created_at: Date;
  event_date: Date;
  qualities: Quality[];
  geom?: Geom;
  profile: Profile;
  profile_id: string;
  master: Master;
  master_id: number;
  activities: Activity[];
  location?: string;
}

export interface HeroTable {
  id?: number;
  name: string;
  profile_id: string;
  master_id: number;
  geom?: Geom;
  arr?: HeroQualitiesTable[];
  event_date?: Date;
  location?: string;
}

export interface HeroQualitiesTable {
  hero_id?: number;
  quality_id: number;
}
