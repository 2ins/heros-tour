import { Pipe, PipeTransform } from '@angular/core';
import { Quality } from '../model/quality';

@Pipe({
  name: 'findQualityFromSearch',
})
export class FindQualityFromSearchPipe implements PipeTransform {
  transform(
    qualitySearch: number[] | undefined,
    qualities: Quality[] | undefined
  ): Quality[] | undefined {
    if (qualities && qualitySearch && qualitySearch.length > 0) {
      // Filtra `qualities` per includere solo gli elementi il cui id è presente in `qualitySearch`
      var res = qualities.filter((x) => qualitySearch.includes(x.id));
      res.map((quality) => {
        quality.isSearch = true;
      });

      // Crea un array con gli elementi di `res` per primi
      var result = [...res];

      // Aggiungi gli elementi di `qualities` che non sono in `res`
      qualities.forEach((quality) => {
        if (!result.some((resItem) => resItem.id === quality.id)) {
          result.push(quality);
        }
      });

      return result;
    }
    console.log('diocano');
    return qualities;
  }
}
