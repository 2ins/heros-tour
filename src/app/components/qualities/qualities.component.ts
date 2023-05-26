import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MobileService } from 'src/app/services/mobile.service';
import { GetQualities } from '../../actions/quality.action';
import { Quality } from '../../model/quality';
import { HeroState } from '../../states/todo.state';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.component.html',
  styleUrls: ['./qualities.component.css'],
})
export class QualitiesComponent implements OnInit {
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  isMobile: boolean = false;
  constructor(
    private store: Store,
    private readonly supabase: SupabaseService,
    private route: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public mobileService: MobileService
  ) {
    console.log(this.route);
  }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile();
    this.store.dispatch(new GetQualities());
    this.activatedRoute.data.subscribe((d) => {
      console.log('data', d);
    });

    this.activatedRoute.fragment.subscribe((v) => {
      console.log('fragment', v);

      this.jumpTo(v);
    });
  }

  jumpTo(v: string | null) {
    if (v) {
      console.log('info document', document.getElementById(v));
    }
    if (v != null && document.getElementById(v) != null) {
      const x = document.getElementById(v);
      if (x != null) {
        console.log('info document', x);
        x.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
