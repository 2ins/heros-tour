import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../model/hero';

@Pipe({
  name: 'descriptionManager',
})
export class DescriptionManagerPipe implements PipeTransform {
  transform(value: Hero): string {
    var out: string = value.name;
    let res = out.trim().charAt(out.trim().length - 1);
    if (!(res == '.' || res == '!' || res == '?')) {
      out += '. ';
    }
    value.qualities.forEach((q) => {
      if (q.desc_xp && q.desc_xp.trim() != '') {
        out += ' ' + q.desc_xp;
        let res = q.desc_xp.trim().charAt(q.desc_xp.length - 1);
        if (!(res == '.' || res == '!' || res == '?')) {
          out += '. ';
        }
      }
    });
    return out;
  }
}
