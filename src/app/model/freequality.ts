export interface FreeQuality {
  quality: string; // Nome della qualità
  activities: FreeActivity[]; // Array di attività associate
  total?: number; // Conteggio totale delle occorrenze (opzionale)
  expanded: boolean;
}

export interface FreeActivity {
  id?: number;
  activity_name: string;
  activity_count: number;
}
