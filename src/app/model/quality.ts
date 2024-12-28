import { Activity } from './activity';
import { HeroListElement } from './hero';

export interface Quality {
  id: number;
  name: string;
  count: number;
  description: string;
  tags: string[];
  virtue: string;
  //created_at: Date;
  activities?: Activity[];
  selected: boolean;
  desc_xp?: string;
  desc_all?: HeroListElement[];
  isSearch: boolean;
  discovered?: boolean;
}

export interface Virtue {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export const virtue_wisdom: string =
  'These strengths are useful in helping us learn and gather knowledge';
export const virtue_courage: string =
  'These emotional strengths empower us to tackle adversity and how we tend to work through it.';
export const virtue_humanity: string =
  'These strengths come into play by helping us build and maintain positive, warm relationships with others.';
export const virtue_justice: string =
  'With these strengths, we relate to those around us in social or group situations.';
export const virtue_temperance: string =
  'Temperance strengths help us manage habits and protect against excess, including managing and overcoming vices.';
export const virtue_trascendence: string =
  ' As a virtue, transcendence strengths connect us to the world around us in a meaningful way.';

export const VIRTUES_LIST: Virtue[] = [
  { id: 'WI', name: 'Wisdom', color: 'yellow', description: virtue_wisdom },
  { id: 'CO', name: 'Courage', color: 'blu', description: virtue_courage },
  { id: 'HU', name: 'Humanity', color: 'red', description: virtue_humanity },
  { id: 'JU', name: 'Justice', color: 'green', description: virtue_justice },
  {
    id: 'TE',
    name: 'Temperance',
    color: 'orange',
    description: virtue_temperance,
  },
  {
    id: 'TR',
    name: 'Trascendence',
    color: 'violet',
    description: virtue_trascendence,
  },
];
