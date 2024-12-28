import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetQualities } from 'src/app/actions/quality.action';
import { Quality } from 'src/app/model/quality';
import { HeroState } from 'src/app/states/todo.state';
import * as descs from '../../../../../assets/strenghts_desc.json';
@Component({
  selector: 'app-qualities-accordion-deck',
  templateUrl: './qualities-accordion-deck.component.html',
  styleUrls: ['./qualities-accordion-deck.component.css'],
})
export class QualitiesAccordionDeckComponent implements OnInit {
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  thequalitites: Quality[] = [];
  data: any = descs;
  hashMap = new Map<string, Quality[]>();
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.qualities?.subscribe((e) => {
      if (e.length == 0) {
        this.store.dispatch(new GetQualities());
      }
      this.thequalitites = e;
      this.generatehash();
    });
  }
  showMore: boolean[] = this.thequalitites.map(() => false);

  toggleShowMore(index: number) {
    this.showMore[index] = !this.showMore[index];
  }

  private generatehash() {
    if (this.thequalitites) {
      this.hashMap.clear();

      this.thequalitites.forEach((el: Quality) => {
        if (!this.hashMap.get(el.virtue)) {
          this.hashMap.set(el.virtue, []);
        }

        this.hashMap.get(el.virtue)?.push(el);
      });
    }
  }
}
