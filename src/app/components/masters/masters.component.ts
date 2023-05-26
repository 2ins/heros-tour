import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Search } from 'src/app/model/search';
import { MobileService } from 'src/app/services/mobile.service';
import {
  GetMastersOverview,
  GetMastersOverviewSearch,
  SetSelectedMaster,
} from '../../actions/master.action';
import { Master } from '../../model/master';
import { HeroState } from '../../states/todo.state';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css'],
})
export class MastersComponent implements OnInit {
  @Select(HeroState.getMasterList) masters?: Observable<Master[]>;

  searchMaster?: string;
  isMobile: boolean = false;
  indxTab: number = 0;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private ms: MobileService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.ms.isMobile();
    this.store.dispatch(new GetMastersOverview());
  }
  onSelect(master: Master): void {
    this.store.dispatch(new SetSelectedMaster(master.id));
  }

  getNotification(evt: Event) {
    var x = evt as unknown as Search;
    this.store.dispatch(new GetMastersOverviewSearch(x));
    this.indxTab = 0;
  }
}
