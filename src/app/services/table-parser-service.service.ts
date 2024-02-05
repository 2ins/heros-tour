import { Injectable } from '@angular/core';
import { TableRow } from '../model/gpt-parser';

@Injectable({
  providedIn: 'root',
})
export class TableParserService {
  parseTableText(text: string): TableRow[] {
    const rows = text.split('\n');
    return rows.slice(1).map((row) => {
      const columns = row
        .split('|')
        .map((col) => col.trim())
        .filter((col) => col);
      return {
        Quality: columns[0],
        Description: columns[1],
        Seligman_Strengths: columns[2],
        Citations: columns[3],
        Deductions: columns[4],
        Alternative_Main_Strenghts: columns[5],
        Alternative_Deductions: columns[6],
      };
    });
  }
}
