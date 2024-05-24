import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetQualities } from 'src/app/actions/quality.action';
import { Article, TableItem, TransformedItem } from 'src/app/model/article';
import { Quality } from 'src/app/model/quality';
import { HeroState } from 'src/app/states/todo.state';

@Component({
  selector: 'app-experience-article',
  templateUrl: './experience-article.component.html',
  styleUrls: ['./experience-article.component.css'],
})
export class ExperienceArticleComponent implements OnInit {
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  theQs: Quality[] = [];
  myQs: Quality[] = [];

  @Input('article')
  article?: Article;

  @Input('test')
  test?: boolean = false;

  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    this.qualities?.subscribe((e) => {
      if (e.length == 0) {
        this.store.dispatch(new GetQualities());
      } else {
        this.theQs = e;
        if (this.article?.table) {
          var items = this.transformTableItems(this.article?.table);
          this.myQs = this.getQualityArray(this.theQs, items);
        }
      }
    });
  }

  filterQualityList(listaCurrentQs: string[]): Quality[] {
    var appo = this.theQs?.filter((quality) =>
      listaCurrentQs.includes(quality.name)
    );

    return appo;
  }

  transformTableItems(tableItems: TableItem[]): TransformedItem[] {
    const transformedArray: TransformedItem[] = [];
    console.log('tableItems', tableItems);
    tableItems.forEach((item) => {
      item.Seligman_Strengths.forEach((strength) => {
        const existingItem = transformedArray.find(
          (tItem) => tItem.seligman_strength === strength
        );

        if (existingItem) {
          existingItem.count++;
          existingItem.quality_description.push(item.Quality);
        } else {
          const newItem: TransformedItem = {
            seligman_strength: strength,
            count: 1,
            quality_description: [item.Quality],
          };
          transformedArray.push(newItem);
        }
      });
    });

    return transformedArray;
  }

  getQualityArray(
    qualities: Quality[],
    transformedArray: TransformedItem[]
  ): Quality[] {
    const updatedQualities: Quality[] = [];

    transformedArray.forEach((transformedItem) => {
      const matchingQuality = qualities.find(
        (quality) => quality.name === transformedItem.seligman_strength
      );

      if (matchingQuality) {
        const updatedQuality: Quality = {
          ...matchingQuality,
          desc_xp: transformedItem.quality_description.join(', '),
        };
        updatedQualities.push(updatedQuality);
      }
    });

    return updatedQualities;
  }

  open(q: TableItem) {
    this.route.navigateByUrl('/experiencesByQuality/quality/' + q.Quality);
  }
  //popoup utils
  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }
}
