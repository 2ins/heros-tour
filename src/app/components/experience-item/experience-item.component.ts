import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetSelectedHero } from 'src/app/actions/hero.action';
import { Hero } from 'src/app/model/hero';
import { MobileService } from 'src/app/services/mobile.service';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.css'],
})
export class ExperienceItemComponent implements OnInit {
  @Input()
  hero?: Hero;

  @Input()
  reverse?: boolean;

  isMobile: boolean = false;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router,
    private ms: MobileService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
  }

  onSelect(hero: Hero): void {
    this.store.dispatch(new SetSelectedHero(hero));
    this.router.navigate(['/experiences/experience/', hero.id]);
  }
}
