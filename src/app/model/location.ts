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

export interface LocationDbItem {
  frammento: string;
  count: number;
}

export interface LocationAggDbItem {
  stato: string;
  level_1: string;
  xps: number;
  geom?: Geom;
}

export interface LocationAggComboDbItem {
  stato: string;
  total: number;
  children: LocationAggComboJson[];
}

export interface LocationAggComboJson {
  level_1: string;
  xps: number[];
  tot: number;
}
