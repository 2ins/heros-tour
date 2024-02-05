import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css'],
})
export class HomeSearchComponent implements OnInit {
  authenticated: boolean = false;
  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit(): void {
    if (this.supabase._session) {
      console.log('this.supabase._session', this.supabase._session);
      this.authenticated = true;
    }
  }
}
