import { Component, Input, OnInit } from '@angular/core';
import { AuthSession } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  constructor(private supabase: SupabaseService) {}
  @Input()
  session!: AuthSession;

  ngOnInit(): void {}
  onLogOut(): void {
    console.log('sign out', this.session.user.email);
    this.supabase.signOut();
  }
}
