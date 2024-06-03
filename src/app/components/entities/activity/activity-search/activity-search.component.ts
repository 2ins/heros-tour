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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, map, startWith } from 'rxjs';
import { GetAllActivities } from 'src/app/actions/activity.action';
import { SetAddedMaster } from 'src/app/actions/master.action';
import { ActivityTable } from 'src/app/model/activity';
import { MasterTable } from 'src/app/model/master';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { ActivityMasterInsertComponent } from '../activity-master-insert/activity-master-insert.component';

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html',
  styleUrls: ['./activity-search.component.css'],
})
export class ActivitySearchComponent implements OnInit {
  isSearchOnly: boolean = false;
  data: any = {};
  isMobile: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private store: Store,
    private route: Router,
    private location: Location,
    public dialog: MatDialog,
    private actrout: ActivatedRoute,
    private mobile: MobileService
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
  }

  @ViewChild('textSearch')
  public textSearch!: ElementRef;

  @Select(HeroState.getAllActivities) activitiesObs?: Observable<
    ActivityTable[]
  >;
  @Select(HeroState.getAddedMaster) addMaster?: Observable<MasterTable>;
  filteredStreets?: Observable<ActivityTable[]>;
  activities: ActivityTable[] = [];
  preselectedCopy?: ActivityTable[];
  control = new FormControl();
  searchLoc: string = '';
  newMaster?: MasterTable;
  activityButtonDisabled: boolean = true;

  ngOnInit(): void {
    this.isMobile = this.mobile.isMobile();
    if (this.data && this.data.type == 'search') {
      this.isSearchOnly = true;
    } else {
      this.isSearchOnly = false;
    }

    this.store.dispatch(new GetAllActivities());
    this.activitiesObs?.subscribe((e) => {
      console.log('activities', e);
      this.activities = e;
      this.activities.sort((a, b) => {
        const stringA = a.description.toLowerCase(); // Converti in minuscolo per un confronto case-insensitive
        const stringB = b.description.toLowerCase();
        return stringA.localeCompare(stringB);
      });
      this.filteredStreets = this.control.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
      this.addMaster?.subscribe((e) => {
        this.newMaster = e;
        if (e.preselectedActivities) {
          e.preselectedActivities.forEach((e) => {
            console.log('e', e);
            var act = this.activities.find((a) => a.id == e.id);
            if (act) {
              act.selected = true;
            }
          });
          if (!this.preselectedCopy) {
            console.log('preselected activities cosa!');
            this.preselectedCopy = Array.from(e.preselectedActivities);
            console.log('preselectedCopy,', this.preselectedCopy);
          }
        }
      });
    });
  }
  private _filter(value: string): ActivityTable[] {
    if ((this.isSearchOnly && value.length > 0) || !this.isSearchOnly) {
      const filterValue = this._normalizeValue(value);
      return this.activities.filter((activities) =>
        this._normalizeValue(activities.description).includes(filterValue)
      );
    }
    return [];
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  addXp(item: ActivityTable) {
    this.textSearch.nativeElement.blur();
  }
  update(item: ActivityTable) {
    item.selected = !item.selected;
    this.activityButtonDisabled = this.isButtonDisabled();
  }
  unFocusOnSearchControl() {
    this.textSearch.nativeElement.blur();
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  }
  backClicked() {
    //this.location.back();
    if (this.newMaster) {
      this.newMaster.preselectedActivities = this.preselectedCopy;
    }
  }
  save() {
    if (this.newMaster) {
      this.newMaster.preselectedActivities = this.activities.filter(
        (e) => e.selected == true
      );
      console.log('jesu ', this.newMaster.preselectedActivities);
      this.store.dispatch(new SetAddedMaster(this.newMaster));
    }
  }
  openDialog() {
    //this.textElem?.nativeElement.blur();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = '{padding-top:0px;}';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';

    var dialogRef = this.dialog.open(
      ActivityMasterInsertComponent,
      dialogConfig
    );

    //dialogRef.componentInstance.placeHolder = 'Search activities';
    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onAdd
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  arraysAreIdentical<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  isButtonDisabled(): boolean {
    var set1 = this.activities
      .filter((e) => e.selected == true)
      .map((e) => e.id);
    var set2 = this.preselectedCopy?.map((e) => e.id);
    console.log('activities filtered', set1);
    console.log('preselectedCopy ', set2);
    if (set1.length == 0 && !set2) {
      return true;
    }

    if (set1 && set2) {
      return this.arraysAreIdentical(set1, set2);
    }

    return false;
  }

  goToActivityPage(item: ActivityTable) {
    this.route.navigateByUrl('/activities/activity/' + item.id);
  }
}
