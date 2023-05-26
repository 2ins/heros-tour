import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetMasters, SetSelectedMaster } from 'src/app/actions/master.action';
import { MobileService } from 'src/app/services/mobile.service';
import { Master } from '../../model/master';
import { HeroState } from '../../states/todo.state';
import { SupabaseService } from '../../supabase.service';
@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css'],
})
export class MasterDetailComponent implements OnInit {
  @Select(HeroState.getSelectedMaster) selectedMaster?: Observable<Master>;
  @Select(HeroState.getMasterList) masters?: Observable<Master[]>;

  @Output() selectedChange: EventEmitter<Master> = new EventEmitter();

  master?: Master;
  masterId?: any;
  isMobile: boolean = false;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private ms: MobileService
  ) {}

  addXp() {
    this.isMobile = false;
    const appo = { oggetto: this.master };
    console.log('da passare:', appo);

    this.route.navigateByUrl('/addnew', { state: appo });
    //this.route.navigateByUrl('/addnew', { state: { id: 100, name: 'Maya' } });
  }
  ngOnInit(): void {
    this.selectedMaster?.subscribe((m) => {
      this.master = m;
    });

    this.activatedRoute.paramMap.subscribe((map) => {
      this.masterId = map.get('id');
      console.log('masterid?:' + this.masterId);
      this.store.dispatch(new SetSelectedMaster(this.masterId));
    });

    this.masters?.subscribe((ms) => {
      if (ms) {
        if (ms.length == 0) {
          this.store.dispatch(new GetMasters());
        }
      }
    });
  }

  backClicked() {
    this.location.back();
  }
  edit() {
    const appo = { master: this.master };
    console.log('prima', appo);
    this.route.navigateByUrl('/addMaster', { state: appo });
  }
}
