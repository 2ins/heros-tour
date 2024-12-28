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
import { User } from '@supabase/supabase-js';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedMaster } from 'src/app/actions/master.action';
import { SetUserProfile } from 'src/app/actions/profiles.action';
import { Quality } from 'src/app/model/quality';
import { MobileService } from 'src/app/services/mobile.service';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';
import { transformToFlatArray } from 'src/app/utils/utilityfunctions';
import { Master } from '../../../../model/master';
import { HeroState } from '../../../../states/todo.state';
import { PopupComponent } from '../../../popup/popup.component';
@Component({
  selector: 'app-master-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./master-detail.component.css'],
})
export class MasterDetailComponent implements OnInit, OnDestroy {
  [x: string]: any;
  @Select(HeroState.getSelectedMaster) selectedMaster?: Observable<Master>;
  @Select(HeroState.getUserProfile) currentUser?: Observable<MyProfile>;
  //@Select(HeroState.getMasterList) masters?: Observable<Master[]>;
  private subscription?: Subscription;

  @Output() selectedChange: EventEmitter<Master> = new EventEmitter();

  master?: Master;
  masterId?: any;
  isMobile: boolean = false;
  qualities?: Quality[];
  randomNumber?: number;
  authenticated: boolean = false;
  profile: any = null;
  freequalities: any[] = [];
  filteredfreequalities: any[] = [];
  helpText: boolean = false;

  centersAppo: google.maps.LatLngLiteral[] = [];

  filterByStrength = (data: any[], strength: string): any[] => {
    return data
      .map((item) => ({
        ...item,
        group: item.group.filter(
          (group: { Seligman_Strengths: string | string[] }) =>
            group.Seligman_Strengths.includes(strength)
        ),
      }))
      .filter((item) => item.group.length > 0);
  };

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

      if (m.table) {
        this.freequalities = transformToFlatArray(m.table);

        this.filteredfreequalities = this.freequalities;
      }

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
    this.route.navigateByUrl('/addnew', { state: appo });
  }

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.activatedRoute.paramMap.subscribe((map) => {
      this.masterId = map.get('id');
      this.store.dispatch(new SetSelectedMaster(this.masterId));
    });
    this.loadUser();
  }

  //***********tutto qui la gestione corretta dell'utenza passa per qui */
  async loadUser() {
    if (!this.profile) {
      await this.getUser().then((p) => {
        this.profile = p;
        this.store.dispatch(new SetUserProfile(this.profile));
      });
    }
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabase.getUserSupabase();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data.user;
  }

  /////////////////////////////

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

  appo(sel: Quality) {
    this.filteredfreequalities = this.filterByStrength(
      this.freequalities,
      sel.name
    );
    console.log(
      'filteredfreequalities aggiornato:' + this.filteredfreequalities.length
    );
  }
}
