import { Pipe, PipeTransform } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Quality } from '../model/quality';
import { HeroState } from '../states/todo.state';

@Pipe({
  name: 'virtueColorFinderByStrenghtId',
})
export class VirtueColorFinderByStrenghtIdPipe implements PipeTransform {
  constructor(private store: Store) {}
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;

  transform(value: number): any {
    var qs: Quality[] = [];
    var appo = 'appo' as String | undefined;
    if (this.qualities) {
      this.qualities.subscribe((x) => {
        qs = x;
        console.log(value);
        appo = qs.find((elem) => elem.id == value)?.virtue;
        console.log('appo ', appo);
        return appo;
      });
      return appo;
    }
  }
}
