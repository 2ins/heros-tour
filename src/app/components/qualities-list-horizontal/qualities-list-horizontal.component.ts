import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Quality } from 'src/app/model/quality';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-qualities-list-horizontal',
  templateUrl: './qualities-list-horizontal.component.html',
  styleUrls: ['./qualities-list-horizontal.component.css'],
})
export class QualitiesListHorizontalComponent implements OnInit {
  @Input()
  qualities?: Quality[] = [];

  @Input()
  total?: number;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
