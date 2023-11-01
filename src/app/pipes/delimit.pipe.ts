import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delimit',
})
export class DelimitPipe implements PipeTransform {
  transform(isMobile: boolean | undefined): unknown {
    if (isMobile == true) {
      return ' ';
    } else {
      return '\n\n';
    }
  }
}
