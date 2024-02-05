import { MyProfile } from '../supabase.service';
import { Activity } from './activity';
import { Article, TableItem } from './article';
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
  profile: MyProfile;
  profile_id: string;
  master: Master;
  master_id: number;
  activities: Activity[];
  location?: string;
  json?: Article;
  value?: TableItem;
}

export interface HeroTable {
  id?: number;
  name: string;
  profile_id: string;
  master_id: number;
  geom?: Geom;
  arr?: HeroQualitiesTable[];
  event_date?: Date;
  formatoData?: string;
  location?: string;
  json?: Article;
}

export interface HeroQualitiesTable {
  hero_id?: number;
  quality_id: number;
  desc_xp?: string;
}

export type ActivityFrequency = { [activityName: string]: number };
