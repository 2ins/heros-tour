import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, regexValue: string, replaceValue: string): any {
    let regex = new RegExp(regexValue, 'g');
    return (
      'https://www.google.com/search?q=' + value.replace(regex, replaceValue)
    );
  }
}
