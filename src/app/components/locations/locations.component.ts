import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Geom } from '../../model/geom';
import { Hero } from '../../model/hero';
import { HeroState } from '../../states/todo.state';
import { SupabaseService } from '../../supabase.service';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  markers: MarkerProperties[] = [];

  zoom = 4;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    //maxZoom: 50,
    //minZoom: 8,
  };

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private ngZone: NgZone
  ) {
    this.center = { lat: 24, lng: 12 };
  }

  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;

  hero?: Hero;

  ngOnInit(): void {
    this.selectedHero?.subscribe((h) => {
      this.hero = h;
      console.log('selectedHero:', h);
      if (h.geom) {
        this.center = {
          lat: h.geom.coordinates[0],
          lng: h.geom.coordinates[1],
        };
      }
    });
  }

  zoomIn() {
    //  if (this.options.maxZoom) {
    //if (this.zoom < this.options.maxZoom)
    this.zoom++;
    // }
  }
  zoomOut() {
    //  if (this.options.minZoom) {
    //if (this.zoom > this.options.minZoom)
    this.zoom--;
    // }
  }

  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log({ place }, place.geometry.location?.lat());

        if (place != null) {
          //set latitude, longitude and zoom
          let latitude = place.geometry.location?.lat();
          let longitude = place.geometry.location?.lng();

          let x = place.address_components?.filter((x) => {
            x.types[0] === 'country';
          });

          console.log('coordinates', latitude, longitude, x);

          console.log('this.hero', this.hero);

          if (this.hero) {
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

            this.hero.geom = g;
            console.log('TEST F2', g);
          }

          if (this.hero) {
            console.log('this.hero.geom', this.hero.geom);
          }

          this.center = {
            lat: latitude as any,
            lng: longitude as any,
          };

          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.center.lat, this.center.lng),
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL dell'icona rossa
          });

          var mark: MarkerProperties = {
            position: { lat: this.center.lat, lng: this.center.lng },
          };

          this.markers.push(mark);
          console.log('mapp:', this.markers);
        }
      });
    });
  }

  /*
  onMapReady(map: any) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.center.lat, this.center.lng),
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL dell'icona rossa
    });
    console.log('mappa');
  }

  handleMapInitialized(map: google.maps.Map) {
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        map,
      });
    });
  }
  */
}
