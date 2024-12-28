import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetHeroesByQuality } from 'src/app/actions/hero.action';
import { ElemCount, ElemCountIds } from 'src/app/model/article';
import { Hero } from 'src/app/model/hero';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';

@Component({
  selector: 'app-experiences-by-quality',
  templateUrl: './experiences-by-quality.component.html',
  styleUrls: ['./experiences-by-quality.component.css'],
})
export class ExperiencesByQualityComponent implements OnInit {
  @Select(HeroState.getHeroList) heroes?: Observable<Hero[]>;
  theExps?: Hero[];
  quality?: string;
  strengthsCount?: { strength: string; count: number }[];
  activitiesCount?: { id: number; name: string; count: number }[];
  isMobile: boolean = false;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private location: Location,
    private ms: MobileService
  ) {}

  open(hero: Hero) {
    console.log('inside');
    this.route.navigateByUrl('/experiences/experience/' + hero.id);
  }
  objectEntries(obj: Object) {
    return Object.entries(obj);
  }

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.activatedRoute.data.subscribe((data) => {
      console.log('byQuality', data['byQuality']); // qui puoi accedere al valore di byQuality
    });

    this.activatedRoute.paramMap.subscribe((map) => {
      console.log('map', map);
      this.quality = map.get('q') as string;
      if (this.quality) {
        console.log('quality:', this.quality);
        this.store.dispatch(new GetHeroesByQuality(this.quality));
      }
    });

    this.heroes?.subscribe((e) => {
      this.theExps = e;
      this.strengthsCount = this.countSeligmanStrengths(e);
      this.activitiesCount = this.calculateActivityFrequency(e);
    });
  }

  countSeligmanStrengths(items: Hero[]): { strength: string; count: number }[] {
    const strengthsCount: ElemCount = {};

    items.forEach((item) => {
      if (item.value) {
        item.value.Seligman_Strengths.forEach((strength) => {
          if (strengthsCount[strength]) {
            strengthsCount[strength]++;
          } else {
            strengthsCount[strength] = 1;
          }
        });
      }
    });

    // Converti l'oggetto in un array e ordina
    const sortedStrengths = Object.entries(strengthsCount)
      .map(([strength, count]) => ({ strength, count }))
      .sort((a, b) => b.count - a.count);

    return sortedStrengths;
  }

  calculateActivityFrequency(
    heroes: Hero[]
  ): { id: number; name: string; count: number }[] {
    const frequency: ElemCountIds = {};

    heroes.forEach((hero) => {
      hero.activities.forEach((activity) => {
        const key = activity.name;
        if (frequency[key]) {
          frequency[key].count++;
        } else {
          frequency[key] = {
            id: activity.id,
            name: activity.description,
            count: 1,
          };
        }
      });
    });

    const frequencyArray = Object.values(frequency);

    // Ordina l'array per count in modo decrescente
    frequencyArray.sort((a, b) => b.count - a.count);

    return frequencyArray;
  }

  backClicked() {
    this.location.back();

    if (this.location.back.length === 0) {
      this.route.navigate(['/home']);
    } else {
      this.location.back();
    }
  }
}
