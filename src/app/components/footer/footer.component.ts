import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetSelectedUser } from 'src/app/actions/profiles.action';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  idUser?: string;
  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {
    this.idUser = this.supabase._session?.user.id;
  }

  ngOnInit(): void {}

  openPersonalUserPage(): void {
    console.log('diocane');
    console.log(this.supabase._session?.user.id);
    if (this.supabase._session?.user.id) {
      this.idUser = this.supabase._session?.user.id;
      this.store.dispatch(new SetSelectedUser(this.idUser));
      this.router.navigate(['/users/user/', this.idUser]);
    }
  }
}
