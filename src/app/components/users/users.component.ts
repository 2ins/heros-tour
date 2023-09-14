import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsers, SetSelectedUser } from 'src/app/actions/profiles.action';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @Select(HeroState.getUsers) users?: Observable<MyProfile[]>;

  searchUser?: string;
  isMobile: boolean = false;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private ms: MobileService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.users?.subscribe((us) => {
      if (us) {
        if (
          us.length == 0 &&
          (!this.searchUser || this.searchUser.trim() == '')
        ) {
          this.store.dispatch(new GetUsers(''));
        }
      }
    });

    this.users?.subscribe((us) => {
      us.forEach((u) => {
        u.qualities?.sort((a, b) => {
          return b.count - a.count;
        });
      });
    });
  }
  onSelect(user: MyProfile): void {
    console.log('user clicked: ', user.id);
    this.store.dispatch(new SetSelectedUser(user.id));
  }
  onSearch(): void {
    if (this.searchUser) this.store.dispatch(new GetUsers(this.searchUser));
    else {
      this.store.dispatch(new GetUsers(''));
    }
  }
}
