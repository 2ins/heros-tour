import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Hero } from 'src/app/model/hero';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-multiple-locations-map',
  templateUrl: './multiple-locations-map.component.html',
  styleUrls: ['./multiple-locations-map.component.css'],
})
export class MultipleLocationsMapComponent implements OnInit {
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  @Input()
  centers?: google.maps.LatLngLiteral[];

  markers: MarkerProperties[] = [];

  zoom = 0.5;
  center!: google.maps.LatLng;

  bounds = new google.maps.LatLngBounds();
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    //maxZoom: 50,
    //minZoom: 8,
  };

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private ngZone: NgZone
  ) {}

  @Select(HeroState.getSelectedHero) selectedHero?: Observable<Hero>;

  ngOnInit(): void {
    this.centers?.forEach((x) => {
      this.bounds.extend(x);
      console.log('point', x);
    });

    this.center = this.bounds.getCenter();
  }

  zoomIn() {
    this.zoom++;
  }
  zoomOut() {
    this.zoom--;
  }

  onMarkerClick(): void {
    console.log('ciao');
  }
}
