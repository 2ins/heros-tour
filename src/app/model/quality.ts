import { Activity } from './activity';

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
}

export interface Virtue {
  id: string;
  name: string;
  color: string;
}

export const VIRTUES_LIST: Virtue[] = [
  { id: 'WI', name: 'Wisdome and Knowledge', color: 'yellow' },
  { id: 'CO', name: 'Courage', color: 'blu' },
  { id: 'HU', name: 'Humanity', color: 'red' },
  { id: 'JU', name: 'Justice', color: 'green' },
  { id: 'TE', name: 'Temperance', color: 'orange' },
  { id: 'TR', name: 'Trascendence', color: 'violet' },
];
