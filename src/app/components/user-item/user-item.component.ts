import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetSelectedUser } from 'src/app/actions/profiles.action';
import { Profile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  @Input()
  user?: Profile;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelect(u: Profile): void {
    this.store.dispatch(new SetSelectedUser(u.id));
    this.router.navigate(['/users/user/', u.id]);
  }
}
