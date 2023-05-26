import { Pipe, PipeTransform } from '@angular/core';
import { VIRTUES_LIST } from '../model/quality';

@Pipe({
  name: 'virtueFinder',
})
export class VirtueFinderPipe implements PipeTransform {
  transform(value: String): unknown {
    return VIRTUES_LIST.find((elem) => elem.id === value)?.name;
  }
}
