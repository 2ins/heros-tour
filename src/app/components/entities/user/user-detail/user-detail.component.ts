import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsers, SetSelectedUser } from 'src/app/actions/profiles.action';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Select(HeroState.getSelectedUser) selectedUser?: Observable<MyProfile>;
  @Select(HeroState.getUsers) users?: Observable<MyProfile[]>;

  user?: MyProfile;
  userId?: any;
  isMobile: boolean = false;
  isOwner: boolean = false;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private ms: MobileService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.selectedUser?.subscribe((u) => {
      this.user = u;
      u.qualities?.sort((a, b) => b.count - a.count);
      console.log('antes', u.heroes);
      u.heroes?.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);
        return dateB.getTime() - dateA.getTime();
      });
      console.log('lates', u.heroes);
      if (this.supabase._session?.user.id == u.id) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
    });

    this.activatedRoute.paramMap.subscribe((map) => {
      this.userId = map.get('id');
      console.log('userId?:' + this.userId);
      this.store.dispatch(new SetSelectedUser(this.userId));
    });

    this.users?.subscribe((us) => {
      if (us) {
        console.log('users', us);
        if (us.length == 0) {
          console.log('zero');
          this.store.dispatch(new GetUsers(''));
        }
      }
    });
  }
  backClicked() {
    this.location.back();
  }
  edit() {
    this.route.navigate(['/profile']);
  }
  onLogOut(): void {
    this.supabase.signOut().then(() => {
      this.route.navigate(['/homesearch']);
    });
  }
}
