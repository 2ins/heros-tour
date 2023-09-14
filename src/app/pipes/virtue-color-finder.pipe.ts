import { Pipe, PipeTransform } from '@angular/core';
import { VIRTUES_LIST } from '../model/quality';

@Pipe({
  name: 'virtueColorFinder',
})
export class VirtueColorFinderPipe implements PipeTransform {
  transform(value: String): unknown {
    return VIRTUES_LIST.find((elem) => elem.id === value)?.color;
  }
}
