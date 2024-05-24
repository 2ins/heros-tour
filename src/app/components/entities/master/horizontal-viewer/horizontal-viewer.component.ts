import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HeroListElement } from 'src/app/model/hero';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-horizontal-viewer',
  templateUrl: './horizontal-viewer.component.html',
  styleUrls: ['./horizontal-viewer.component.css'],
})
export class HorizontalViewerComponent implements OnInit {
  @Input()
  descrioptions?: HeroListElement[] = [];
  @Input()
  qid?: number;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  go(q: HeroListElement) {
    console.log('quality selected', this.qid);
    this.router.navigate(['/experiences/experience/', q.hero_id], {
      queryParams: { qid: this.qid },
    });
  }

  ngOnInit(): void {}
}
