import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseLocation',
})
export class ParseLocationPipe implements PipeTransform {
  transform(value: String): unknown {
    if (value == 'türkiye') {
      return 'turkey';
    } else {
      return value;
    }
  }
}
