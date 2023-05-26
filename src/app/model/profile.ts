import { Activity } from './activity';
import { Hero } from './hero';
import { Quality } from './quality';

export interface Profile {
  id: string;
  username: string;
  website: string;
  avatar_url: string;

  qualities?: Quality[];
  tot_xps?: number;
  heroes?: Hero[];
  activities?: Activity[];
}
