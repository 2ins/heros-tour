import { Master } from './master';
import { Quality } from './quality';

export interface Activity {
  id: number;
  name: string;
  description: string;
  img_url?: string;
  count?: number;
  qualities?: Quality[];
  xps_count?: number;
  master_count?: number;
  masters?: Master[];
}

export interface ActivityTable {
  id?: number;
  name: string;
  description: string;
  img_url?: string;
  selected?: boolean;
}
