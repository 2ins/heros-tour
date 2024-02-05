import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-horizontal-viewer',
  templateUrl: './horizontal-viewer.component.html',
  styleUrls: ['./horizontal-viewer.component.css'],
})
export class HorizontalViewerComponent implements OnInit {
  @Input()
  descrioptions?: string[] = [];

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
