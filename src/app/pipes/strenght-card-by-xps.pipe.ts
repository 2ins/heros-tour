import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strenghtCardByXps',
})
export class StrenghtCardByXpsPipe implements PipeTransform {
  transform(qualityCount: number, totXps: number | undefined): unknown {
    var perc = (qualityCount * 100) / (totXps || 1);
    if (perc >= 80) return 'Very strong';
    else if (perc >= 60) return 'Strong';
    else if (perc >= 40) return 'Medium';
    else if (perc >= 20) return 'Weak';
    else return 'Very weak';
    return null;
  }
}
