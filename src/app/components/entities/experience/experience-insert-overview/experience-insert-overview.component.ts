import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, map, startWith } from 'rxjs';
import { GetAllMastersList } from 'src/app/actions/master.action';
import { Master } from 'src/app/model/master';
import { SharedMongoArticleService } from 'src/app/services/shared-mongo-article.service';
import { HeroState } from 'src/app/states/todo.state';

@Component({
  selector: 'app-experience-insert-overview',
  templateUrl: './experience-insert-overview.component.html',
  styleUrls: ['./experience-insert-overview.component.css'],
})
export class ExperienceInsertOverviewComponent implements OnInit {
  titleReview: string = " Write your experience, make someone's experience";
  titleSearch: string = 'Search a master';
  title: string = '';
  data: any = {};

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private store: Store,
    private route: Router,
    private actrout: ActivatedRoute,
    private location: Location,
    private sharedMongoArticleService: SharedMongoArticleService
  ) {
    if (this.injectedData) {
      this.data = this.injectedData;
    } else {
      this.actrout.queryParams.subscribe((params) => {
        if (params) {
          this.data.type = params['type'];
        }
      });
    }
    //se solo se apro da menu button
  }

  @ViewChild('textSearch')
  public textSearch!: ElementRef;

  @Select(HeroState.getAllMasterList) masters?: Observable<Master[]>;
  filteredStreets?: Observable<Master[]>;
  streets: Master[] = [];
  control = new FormControl();
  searchLoc: string = '';

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.type == 'search') {
      this.title = this.titleSearch;
    } else {
      this.title = this.titleReview;
    }
    this.store.dispatch(new GetAllMastersList());
    this.masters?.subscribe((e) => {
      console.log('lenght', e.length);
      this.streets = e;
    });

    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): Master[] {
    if (value.length > 0) {
      const filterValue = this._normalizeValue(value);
      return this.streets.filter((street) =>
        this._normalizeValue(street.name).includes(filterValue)
      );
    }
    return [];
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  addXp(item: Master) {
    this.textSearch.nativeElement.blur();
    console.log('this.textSearch', this.textSearch);
    if (this.data.type == 'search') {
      this.route.navigateByUrl('/masters/master/' + item.id);
    } else if (this.data.type == 'addMongo') {
      this.sharedMongoArticleService.setMaster(item);
    } else {
      const appo = { oggetto: item };
      this.route.navigateByUrl('/addnew', { state: appo });
    }
  }
  unFocusOnSearchControl() {
    this.textSearch.nativeElement.blur();
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  }
  backClicked() {
    this.location.back();
  }
}
