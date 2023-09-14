import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Hero } from 'src/app/model/hero';
import { Quality } from 'src/app/model/quality';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-qualities-list-vertical',
  templateUrl: './qualities-list-vertical.component.html',
  styleUrls: ['./qualities-list-vertical.component.css'],
})
export class QualitiesListVerticalComponent implements OnInit {
  @Input()
  qualities?: Quality[] = [];

  @Input()
  hero?: Hero;

  @Input()
  total?: number;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}
}