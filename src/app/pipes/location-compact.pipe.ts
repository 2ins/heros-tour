import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationCompact',
})
export class LocationCompactPipe implements PipeTransform {
  transform(value: String | undefined): unknown {
    if (value != undefined) {
      value = value.replace(/[0-9]/g, '');
      var arr: string[] = value.split(',');
      var count: number = arr.length;
      return arr[0] + ', ' + arr[count - 1];
    } else {
      return '';
    }
  }
}
