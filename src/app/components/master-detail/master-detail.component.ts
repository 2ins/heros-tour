//YES STATE
import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedMaster } from 'src/app/actions/master.action';
import { Quality } from 'src/app/model/quality';
import { MobileService } from 'src/app/services/mobile.service';
import { Master } from '../../model/master';
import { HeroState } from '../../states/todo.state';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css'],
})
export class MasterDetailComponent implements OnInit, OnDestroy {
  @Select(HeroState.getSelectedMaster) selectedMaster?: Observable<Master>;
  //@Select(HeroState.getMasterList) masters?: Observable<Master[]>;
  private subscription?: Subscription;

  @Output() selectedChange: EventEmitter<Master> = new EventEmitter();

  master?: Master;
  masterId?: any;
  isMobile: boolean = false;
  qualities?: Quality[];
  randomNumber?: number;

  constructor(
    private store: Store,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private ms: MobileService,
    private _snackBar: MatSnackBar
  ) {
    this.subscription = this.selectedMaster?.subscribe((m) => {
      //console.log('subscribe');
      console.log('MASTER SELEZIONATO', m.id);
      //console.log('MASTER old', this.master);
      this.master = m;
      this.qualities = m.qualities;

      m.heroes?.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  addXp() {
    this.isMobile = false;
    const appo = { oggetto: this.master };
    console.log('da passare:', appo);
    this.route.navigateByUrl('/addnew', { state: appo });
    //this.route.navigateByUrl('/addnew', { state: { id: 100, name: 'Maya' } });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      this.masterId = map.get('id');
      //console.log('masterid?:' + this.masterId);

      this.store.dispatch(new SetSelectedMaster(this.masterId));

      //const master = this.store.selectSnapshot(HeroState.getSelectedMaster);
      //console.log('Master xx', master);
    });

    /*
    this.masters?.subscribe((ms) => {
      if (ms) {
        if (ms.length == 0) {
          this.store.dispatch(new GetMasters());
        }
      }
    });
    */
  }

  backClicked() {
    this.location.back();
  }
  edit() {
    const appo = { master: this.master };
    console.log('prima', appo);
    this.route.navigateByUrl('/addMaster', { state: appo });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    // Pulisci lo stato o esegui altre operazioni necessarie quando si lascia la pagina di dettaglio
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PopupComponent, {
      duration: 2 * 1000,
    });
  }
}
