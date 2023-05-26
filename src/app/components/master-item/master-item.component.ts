import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetSelectedMaster } from 'src/app/actions/master.action';
import { Master } from 'src/app/model/master';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-master-item',
  templateUrl: './master-item.component.html',
  styleUrls: ['./master-item.component.css'],
})
export class MasterItemComponent implements OnInit {
  @Input()
  user?: Master;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelect(u: Master): void {
    this.store.dispatch(new SetSelectedMaster(u.id));
    this.router.navigate(['/masters/master/', u.id]);
  }
}
