import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetActivitiesOverview } from 'src/app/actions/activity.action';
import { SearchHeroes } from 'src/app/actions/hero.action';
import { GetMastersOverviewSearch } from 'src/app/actions/master.action';
import { SetActivitySearch } from 'src/app/actions/search.action';
import { Activity } from 'src/app/model/activity';
import { Hero } from 'src/app/model/hero';
import { Master } from 'src/app/model/master';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { SearchCompositeComponent } from '../search-composite/search-composite.component';

@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.css'],
})
export class HomeviewComponent implements OnInit, AfterViewInit {
  isMobile: boolean = false;

  ngAfterViewInit(): void {
    document
      .getElementsByClassName('mat-tab-header-pagination-before')[0]
      .remove();
    document
      .getElementsByClassName('mat-tab-header-pagination-after')[0]
      .remove();
  }

  @Select(HeroState.getActivitySearch) searchX?: Observable<Search>;
  @Select(HeroState.getHeroList) heroes?: Observable<Hero[]>;
  @Select(HeroState.getActivities) activities?: Observable<Activity[]>;
  @Select(HeroState.getMasterList) masters?: Observable<Master[]>;

  //@Select(HeroState.getHeroList) heroes?: Observable<Hero[]>;
  sea: Search = { search: '', arr: [], location: '' };

  @ViewChild('textElem') textElem?: ElementRef;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    public mobileS: MobileService
  ) {}

  remove(el: number): void {
    const index = this.sea.arr.indexOf(el);
    if (index >= 0) {
      this.sea.arr.splice(index, 1);
    }
    const clonedSearch: Search = { ...this.sea };

    this.store.dispatch(new SetActivitySearch(clonedSearch));
    this.store.dispatch(new GetActivitiesOverview(this.sea));
    this.store.dispatch(new SearchHeroes(this.sea));
    this.store.dispatch(new GetMastersOverviewSearch(this.sea));
  }

  removeLocation(): void {
    this.sea.location = '';
    const clonedSearch: Search = { ...this.sea };
    this.store.dispatch(new SetActivitySearch(clonedSearch));
    this.store.dispatch(new GetActivitiesOverview(this.sea));
    this.store.dispatch(new SearchHeroes(clonedSearch));
    this.store.dispatch(new GetMastersOverviewSearch(this.sea));
  }

  ngOnInit(): void {
    this.isMobile = this.mobileS.isMobile();
    this.searchX?.subscribe((appo) => (this.sea = appo));

    /*
    this.heroes?.subscribe((h) => {
      h?.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);
        return dateB.getTime() - dateA.getTime();
      });
    });
    */
    if (this.sea == undefined) {
      var searchc: Search = { search: '', arr: [], location: '' };
      this.store.dispatch(new SetActivitySearch(searchc));
      this.store.dispatch(new SearchHeroes(searchc));
      this.store.dispatch(new GetMastersOverviewSearch(searchc));
      this.store.dispatch(new GetActivitiesOverview(searchc));
    }
  }

  openDialog() {
    this.textElem?.nativeElement.blur();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = 'full-screen-modal';

    const dialogRef = this.dialog.open(SearchCompositeComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      autoFocus: false,
    });
    //dialogRef.componentInstance.placeHolder = 'Search activities';

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
