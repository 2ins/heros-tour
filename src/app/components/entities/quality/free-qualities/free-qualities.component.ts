import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetFreeQualities } from 'src/app/actions/quality.action';
import { FreeQuality } from 'src/app/model/freequality';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-free-qualities',
  templateUrl: './free-qualities.component.html',
  styleUrls: ['./free-qualities.component.css'],
})
export class FreeQualitiesComponent implements OnInit {
  @Select(HeroState.getFreeQualities) qualities?: Observable<FreeQuality[]>;
  thequalitites: FreeQuality[] = [];

  constructor(
    private store: Store,
    private readonly supabase: SupabaseService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.qualities?.subscribe((e) => {
      if (e.length == 0) {
        this.store.dispatch(new GetFreeQualities());
      }
      this.thequalitites = e;
      console.log('the qualities', this.thequalitites);
    });
  }
  open(q: FreeQuality) {
    this.route.navigateByUrl('/experiencesByQuality/quality/' + q.quality);
  }
}
