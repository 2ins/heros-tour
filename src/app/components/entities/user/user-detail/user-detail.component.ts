import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SetSelectedUser } from 'src/app/actions/profiles.action';
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

  user?: MyProfile;
  userId?: any;
  isMobile: boolean = false;
  isOwner: boolean = false;
  theUserLogged?: User;

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
    var appo = this.supabase._session?.user.id;
    this.theUserLogged = this.supabase._session?.user;

    this.selectedUser?.subscribe((u) => {
      this.user = u;

      if (u.qualities) {
        u.qualities?.sort((a, b) => b.count - a.count);
      }

      if (u.heroes) {
        u.heroes?.sort((a, b) => {
          const dateA = new Date(a.event_date);
          const dateB = new Date(b.event_date);
          return dateB.getTime() - dateA.getTime();
        });
      }
    });

    this.activatedRoute.paramMap.subscribe((map) => {
      this.userId = map.get('id');
      console.log('appo', appo);
      console.log('this.userId', this.userId);
      if (appo == this.userId) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
      this.store.dispatch(new SetSelectedUser(this.userId));
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
