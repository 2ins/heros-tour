import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddExperienceTransaction } from 'src/app/actions/hero.action';
import { GetQualities } from 'src/app/actions/quality.action';
import { Article } from 'src/app/model/article';
import { Geom } from 'src/app/model/geom';
import { Hero, HeroQualitiesTable, HeroTable } from 'src/app/model/hero';
import { Master } from 'src/app/model/master';
import { Quality, VIRTUES_LIST } from 'src/app/model/quality';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-experience-insert',
  templateUrl: './experience-insert.component.html',
  styleUrls: ['./experience-insert.component.css'],
})
export class ExperienceInsertComponent implements OnInit, AfterViewInit {
  copy() {
    var date = this.article?.header.date;
    var place = this.article?.header.place;
    var summary = this.article?.header.summary;
    if (place) {
      this.location = place;
    }
    if (summary) {
      this.textareaValue = summary;
    }
    console.log('PORCODDUE', this.article);
  }
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  @Select(HeroState.getUserProfile) profile?: Observable<MyProfile>;
  @Select(HeroState.getNewHeroTable) newHeroTable?: Observable<HeroTable>;

  //VALORI ESPERIENZA DB
  //il master selezionato arriva come parametro in due modi diversi.
  //TODO: verifica se e' meglio usarlo a livello di stato
  selectedMaster?: Master;

  //utenza di riferimento: ok che e' stato caricato da stato
  myProfile?: MyProfile;

  //nome della esperienza.
  textareaValue?: string;

  //data esperienza
  event_date: Date = new Date();

  //location esperienza
  location: string = '';

  //id esperienza
  id?: number;

  //geometria esperienza
  geom?: Geom;

  //controlli
  isUpdate: boolean = false;
  //gestione dispositivo
  isMobile: boolean = false;
  isTablet: boolean = false;
  //utilities
  hashMap = new Map<string, Quality[]>();
  virtuesList = VIRTUES_LIST;
  //Qualita dopo sottoscrizione
  theQualities?: Quality[];

  article?: Article;

  //utilities di location html
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  //utilities per gestire il focus
  @ViewChild('hidden')
  public hidden!: ElementRef;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router,
    public mobileService: MobileService,
    private activRoute: ActivatedRoute,
    private ngZone: NgZone,
    private lctn: Location,
    private el: ElementRef,
    private loc: Location
  ) {}

  ngOnInit(): void {
    this.hidden?.nativeElement.focus();

    var experience: Hero = history.state.experience;
    console.log('EXPERIENCE', experience);
    var preselectedQs: Quality[] = [];
    if (experience) {
      //SONO IN AGGIORNAMENTO
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
      this.article = experience.json;
    } else if (history.state.oggetto) {
      //SONO IN NUOVO INSERIMENTO
      this.selectedMaster = history.state.oggetto;
      console.log('OGGETTO', this.selectedMaster);
      this.article = history.state.article;
      console.log('article', this.article);
      if (history.state.preselected) {
        console.log('diocane');
        preselectedQs = history.state.preselected;
        console.log('preselectedQs', preselectedQs);
      }
    }

    this.isMobile = this.mobileService.isMobile();
    this.isTablet = this.mobileService.isTablet();

    this.qualities?.subscribe((qs) => {
      //assegna alla variabile
      this.theQualities = this.filterQualities(qs);

      // this.theQualities.map((x) => (x.selected = false));
      //hashmap di utility. serve per gestire il raggruppamento nella view
      this.generateMap();
      //valorizza le qualita con selected a true a partire da preselectedQs
      if (preselectedQs.length > 0) {
        this.managePreselected(this.theQualities, preselectedQs);
      }
    });

    this.profile?.subscribe((p) => {
      if (p) {
        this.myProfile = p;
      }
    });
  }

  filterQualities(qualities: Quality[]): Quality[] {
    return qualities.map(
      ({
        id,
        name,
        description,
        count,
        tags,
        virtue,
        isSearch,
        activities,
        desc_xp,
        desc_all,
      }) => ({
        id,
        name,
        description,
        count,
        tags,
        virtue,
        activities,
        selected: false,
        desc_xp,
        desc_all,
        isSearch,
      })
    );
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
    console.log('theQualities', this.theQualities);
    var newHero = this.getNewHero();
    console.log('NEW HERO', newHero);
    console.log('NEW HERO.ARR', newHero.arr);
    this.store.dispatch(new AddExperienceTransaction(newHero)).subscribe(() => {
      this.newHeroTable?.subscribe((e) => {
        this.router.navigateByUrl('/experiences/experience/' + e.id);
      });
    });
  }

  getNewHero(): HeroTable {
    var selectedQs = this.theQualities?.filter((a) => a.selected == true);

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
    var formatoData: string = '';
    if (this.event_date) {
      event_date = new Date(this.event_date);
      formatoData = event_date.toISOString().split('T')[0];
    }

    var lat = 0;
    var long = 0;

    //add hero_qualities to the heroTable
    var appo: HeroQualitiesTable[] = [];
    selectedQs?.forEach((a) => {
      var hq: HeroQualitiesTable = {
        quality_id: a.id,
        desc_xp: a.desc_xp,
      };
      appo.push(hq);
    });

    const copiedArray = [...appo];
    console.log('APPO', appo);

    var json;
    if (this.article) {
      json = this.article;
    }

    var newHero: HeroTable = {
      id: this.id,
      name: nameXP,
      profile_id: pid,
      master_id: m,
      arr: copiedArray,
      geom: this.geom,
      event_date: event_date,
      location: this.location,
      formatoData: formatoData,
      json: json,
    };

    console.log('newHero parsed', JSON.parse(JSON.stringify(newHero)));
    var copy = JSON.parse(JSON.stringify(newHero));
    console.log('copy ', copy);
    return copy;
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
  backClicked() {
    this.loc.back();
  }

  confirmationBack() {
    if (
      confirm(
        'Are you sure to go back ?\n' +
          'Once back, if you want to add an experience you will have to make it again'
      )
    ) {
      this.backClicked();
    }
  }

  //utilities

  generateMap(): void {
    this.hashMap = new Map([]);
    if (this.theQualities != undefined) {
      this.theQualities.forEach((el: Quality) => {
        if (!this.hashMap.get(el.virtue)) {
          this.hashMap.set(el.virtue, []);
        }
        this.hashMap.get(el.virtue)?.push(el);
      });
    }
  }

  private managePreselected(qs: Quality[], preselectedQs: Quality[]) {
    console.log('managePreselected');
    if (this.theQualities && qs.length != 0) {
      this.theQualities.forEach((e) => {
        e.selected = false;
        //sono in aggiornamento

        preselectedQs.forEach((pr) => {
          console.log(pr.id, e.id);
          if (pr.id == e.id) {
            console.log('yes');
            e.selected = true;
            e.desc_xp = pr.desc_xp;
          }
        });
      });
    } else {
      this.store.dispatch(new GetQualities());
    }
  }
}
