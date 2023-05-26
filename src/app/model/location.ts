import { Geom } from './geom';

export interface Location {
  id: number;
  geom: Geom;
  name: string;
  city?: string;
  region?: string;
  country?: string;
  continent?: string;
}
