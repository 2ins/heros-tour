import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedMaster } from 'src/app/actions/master.action';
import { Master } from 'src/app/model/master';
import { HeroState } from 'src/app/states/todo.state';
@Component({
  selector: 'app-testino',
  templateUrl: './testino.component.html',
  styleUrls: ['./testino.component.css'],
})
export class TestinoComponent implements OnInit, OnDestroy {
  @Select(HeroState.getSelectedMaster) selectedMaster?: Observable<Master>;
  isMobile: boolean = false;
  private subscription?: Subscription;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      var masterId = map.get('id') as unknown as number;
      console.log('masterid?:' + masterId);
      this.store.dispatch(new SetSelectedMaster(masterId));
    });
    this.subscription = this.selectedMaster?.subscribe((m) => {
      console.log('selectedMaster SELEZIONATO', m.id);
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    // Pulisci lo stato o esegui altre operazioni necessarie quando si lascia la pagina di dettaglio
  }
}
