import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationCompactDetail',
})
export class LocationCompactDetailPipe implements PipeTransform {
  transform(value: String | undefined): unknown {
    if (value != undefined) {
      value = value.replace(/[0-9]/g, '');
      return value;
    } else {
      return '';
    }
  }
}
