import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByVirtuePipe',
})
export class FilterByVirtuePipe implements PipeTransform {
  transform(qualities: any[], virtue: string): any[] {
    if (!qualities) return [];
    if (!virtue) return qualities;

    return qualities.filter((quality) => quality.virtue === virtue);
  }
}
