import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddHero2 } from 'src/app/actions/hero.action';
import { GetMastersOverview } from 'src/app/actions/master.action';
import { GetQualities } from 'src/app/actions/quality.action';
import { Geom } from 'src/app/model/geom';
import { Hero, HeroQualitiesTable, HeroTable } from 'src/app/model/hero';
import { Master } from 'src/app/model/master';
import { Quality } from 'src/app/model/quality';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-experience-insert',
  templateUrl: './experience-insert.component.html',
  styleUrls: ['./experience-insert.component.css'],
})
export class ExperienceInsertComponent implements OnInit {
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;

  @Select(HeroState.getUserProfile) profile?: Observable<MyProfile>;

  @Select(HeroState.getNewHeroTable) newHeroTable?: Observable<HeroTable>;

  comment: string = '';
  selectedMaster?: Master;
  searchMaster?: string;
  myControl = new FormControl('');

  myProfile?: MyProfile;
  textareaValue?: string;
  isMobile: boolean = false;
  isTablet: boolean = false;
  event_date: Date = new Date();
  location: string = '';

  isUpdate: boolean = false;
  id?: number;
  geom?: Geom;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router,
    public mobileService: MobileService,
    private activRoute: ActivatedRoute,
    private ngZone: NgZone,
    private lctn: Location
  ) {}

  ngOnInit(): void {
    var experience: Hero = history.state.experience;
    var preselectedQs: Quality[] = [];
    if (experience) {
      this.isUpdate = true;
      console.log('experience selected to edit', experience);
      this.selectedMaster = experience.master;
      this.textareaValue = experience.name;
      preselectedQs = experience.qualities;
      this.id = experience.id;
      this.event_date = experience.event_date;
      this.geom = experience.geom;
      if (experience.location) this.location = experience.location;
      console.log('preselectedQs', preselectedQs);
    } else if (history.state.oggetto) {
      this.selectedMaster = history.state.oggetto;
    }

    this.isMobile = this.mobileService.isMobile();
    this.isTablet = this.mobileService.isTablet();
    this.store.dispatch(new GetMastersOverview());

    this.qualities?.subscribe((qs) => {
      if (qs && qs.length != 0) {
        qs.forEach((e) => {
          e.selected = false;
          //sono in aggiornamento
          if (this.isUpdate) {
            preselectedQs.forEach((pr) => {
              console.log(pr.id, e.id);
              if (pr.id == e.id) {
                console.log('yes');
                e.selected = true;
                e.desc_xp = pr.desc_xp;
              }
            });
          }
        });
      } else {
        this.store.dispatch(new GetQualities());
      }
    });

    this.profile?.subscribe((p) => {
      if (p) {
        this.myProfile = p;
      }
    });
  }

  setSelected(m: Master): void {
    console.log('ciao!');
    this.selectedMaster = m;
  }

  updateItem(q: Quality): void {
    console.log('dai: ', q);
    q.selected = !q.selected;
  }

  save(): void {
    var newHero = this.getNewHero();
    this.store.dispatch(new AddHero2(newHero)).subscribe(() => {
      console.log('BEFORE LAST');

      this.sleep(1500).then(() => {
        this.newHeroTable?.subscribe((auxHero) => {
          this.router.navigateByUrl('/experiences/experience/' + auxHero.id);
        });
      });
    });
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //utilities
  getArr(): Quality[] {
    var arr: Quality[] = [];
    if (this.qualities) {
      this.qualities
        .pipe(
          map((array: Quality[]) => {
            array.forEach((item: Quality) => {
              if (item.selected) {
                arr.push(item);
              }
            });
          })
        )
        .subscribe();
    }
    return arr;
  }

  getNewHero(): HeroTable {
    var arr = this.getArr();

    var m = 0;
    if (this.selectedMaster) {
      m = this.selectedMaster.id;
    }
    var pid = '';
    if (this.myProfile) {
      pid = this.myProfile.id;
    }
    var nameXP = '';
    if (this.textareaValue) {
      nameXP = this.textareaValue;
    }

    var event_date = undefined as unknown as Date;
    if (this.event_date) {
      event_date = this.event_date;
    }

    var lat = 0;
    var long = 0;

    //add hero_qualities to the heroTable
    var appo: HeroQualitiesTable[] = [];
    arr.forEach(async (a) => {
      var hq: HeroQualitiesTable = {
        quality_id: a.id,
        desc_xp: a.desc_xp,
      };
      appo.push(hq);
    });

    var newHero: HeroTable = {
      name: nameXP,
      profile_id: pid,
      master_id: m,
      arr: appo,
      geom: this.geom,
      event_date: event_date,
      location: this.location,
    };

    if (this.isUpdate) {
      newHero.id = this.id;
    }

    return newHero;
  }

  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        if (place != null) {
          //set latitude, longitude and zoom
          let latitude = place.geometry.location?.lat();
          let longitude = place.geometry.location?.lng();
          let x = place.address_components?.filter((x) => {
            x.types[0] === 'country';
          });
          console.log('coordinates', latitude, longitude, x);
          var g: Geom = {
            type: 'Point',
            crs: {
              type: 'name',
              properties: {
                name: 'EPSG:4326',
              },
            },
            coordinates: [latitude as number, longitude as number],
          };

          this.geom = g;
          if (place.formatted_address) {
            this.location = place.formatted_address;
          }

          console.log('geometria trovata', g);
        }
      });
    });
  }
}
