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
  description?: string;
}

export const virtue_wisdom: string =
  'The more curious and creative we allow ourselves to become, the more we gain perspective and wisdom and will, in turn, love what we are learning.';
export const virtue_courage: string =
  'The braver and more persistent we become, the more our integrity will increase because we will reach a state of feeling vital, and this results in being more courageous in character.';
export const virtue_humanity: string =
  'There is a reason why Oprah Winfrey is seen as a symbol of virtue for humanitarians: on every show, she approaches her guests with respect, appreciation, and interest (social intelligence), she practices kindness through her charity work, and she shows her love to her friends and family.';
export const virtue_justice: string =
  'Mahatma Gandhi was the leader of the Indian independence movement in British-ruled India. He led India to independence and helped created movements for civil rights and freedom by being an active citizen in nonviolent disobedience. His work has been applied worldwide for its universality.';
export const virtue_temperance: string =
  'Being forgiving, merciful, humble, prudent, and in control of our behaviors and instincts prevents us from being arrogant, selfish, or any other trait that is excessive or unbalanced.';
export const virtue_trascendence: string =
  'The Dalai Lama is a transcendent being who speaks openly why he never loses hope in humanity’s potential. He also appreciates nature in its perfection and lives according to what he believes is his intended purpose.';

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
