interface Citation {
  citation: string;
  context: string;
}

export interface TableItem {
  Quality: string;
  Description: string;
  Seligman_Strengths: string[];
  Citations: Citation[];
  Deductions: string;
  Alternative_Main_Strenghts: string[];
  Alternative_Deductions: string;
}

type Energy = {
  Description: string;
  Body?: number;
  Heart?: number;
  Mind?: number;
  Sexual?: number;
};

type Energies = Record<'Body' | 'Heart' | 'Mind' | 'Sexual', Energy>;

interface Footer {
  Energies: Energy[];
}

interface Header {
  author_name: string;
  author_link: string;
  master_name: string;
  article_link: string;
  summary: string;
  date: string;
  place: string;
  duration: string;
  activity_name: string;
}
interface Convertion {
  converted?: boolean;
}

export interface Article {
  _id: {
    $oid: String;
  };
  id?: String;
  convertion?: Convertion;
  header: Header;
  table: TableItem[];
  footer: Footer;
}

export interface TransformedItem {
  seligman_strength: string;
  count: number;
  quality_description: string[];
}

export type ElemCount = { [key: string]: number };
export type ElemCountIds = {
  [key: string]: { id: number; name: string; count: number };
};
