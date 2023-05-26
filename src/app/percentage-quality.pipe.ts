import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageQuality',
})
export class PercentageQualityPipe implements PipeTransform {
  transform(value: number, arg: number): unknown {
    return Math.trunc((value / arg) * 100);
  }
}
