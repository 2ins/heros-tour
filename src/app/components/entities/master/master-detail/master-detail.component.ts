//YES STATE
import { DOCUMENT, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
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
import { SupabaseService } from 'src/app/supabase.service';
import { Master } from '../../../../model/master';
import { HeroState } from '../../../../states/todo.state';
import { PopupComponent } from '../../../popup/popup.component';
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
  authenticated: boolean = false;

  centersAppo: google.maps.LatLngLiteral[] = [];

  constructor(
    private store: Store,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private ms: MobileService,
    private _snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
    private readonly supabase: SupabaseService
  ) {
    if (this.supabase._session) {
      this.authenticated = true;
    }

    this.document.documentElement.scrollTop = 0;
    this.subscription = this.selectedMaster?.subscribe((m) => {
      m.heroes?.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);
        return dateB.getTime() - dateA.getTime();
      });

      m.locations = m.locations?.sort((a, b) => {
        return b.xps - a.xps;
      });
      m.qualities = m.qualities?.sort((a, b) => {
        return b.count - a.count;
      });

      this.master = m;
      this.qualities = m.qualities;

      // Assicurati che m.locations sia definito prima di procedere
      if (m.locations) {
        var appo = m.locations
          .map((item) => {
            // Verifica che entrambe le coordinate siano definite
            if (
              typeof item.geom?.coordinates[0] === 'number' &&
              typeof item.geom?.coordinates[1] === 'number'
            ) {
              return {
                lat: item.geom.coordinates[0],
                lng: item.geom.coordinates[1],
              };
            }
            return null; // Ritorna null per gli elementi che non hanno coordinate valide
          })
          .filter((item) => item !== null) as google.maps.LatLngLiteral[]; // Filtra gli elementi null e assicura che il tipo restante sia LatLngLiteral[]
      } else {
        var appo: google.maps.LatLngLiteral[] = []; // Inizializza appo come un array vuoto se m.locations è undefined
      }

      this.centersAppo = appo;

      console.log('APPO LOCATIONS', appo);
    });
  }

  addXp() {
    this.isMobile = false;
    const appo = { oggetto: this.master };
    console.log('da passare:', appo);
    this.route.navigateByUrl('/addnew', { state: appo });
  }

  ngOnInit(): void {
    console.log('this.centersAppo', this.centersAppo);

    this.isMobile = this.ms.isMobile();
    this.activatedRoute.paramMap.subscribe((map) => {
      this.masterId = map.get('id');

      this.store.dispatch(new SetSelectedMaster(this.masterId));
    });
  }

  backClicked() {
    this.location.back();

    if (this.location.back.length === 0) {
      this.route.navigate(['/home']);
    } else {
      this.location.back();
    }
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
