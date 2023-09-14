import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription, forkJoin, from } from 'rxjs';
import { Quality } from 'src/app/model/quality';
import { LoaderService } from 'src/app/services/loader.service';
import { MobileService } from 'src/app/services/mobile.service';
import { SupabaseService } from 'src/app/supabase.service';
import { Master } from '../../model/master';
@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css'],
})
export class MasterDetailComponent implements OnInit {
  private subscription?: Subscription;

  @Output() selectedChange: EventEmitter<Master> = new EventEmitter();

  master?: Master;
  masterId?: any;
  masterIdOld?: any;
  isMobile: boolean = false;
  qualities?: Quality[];
  randomNumber?: number;

  constructor(
    private store: Store,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private ms: MobileService,
    private supabase: SupabaseService,
    private loadingService: LoaderService
  ) {}

  addXp() {
    this.isMobile = false;
    const appo = { oggetto: this.master };
    console.log('da passare:', appo);
    this.route.navigateByUrl('/addnew', { state: appo });
    //this.route.navigateByUrl('/addnew', { state: { id: 100, name: 'Maya' } });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      this.masterId = map.get('id');
      console.log('masterid?:' + this.masterId);
      return this.executeSupaBiz();
    });
  }

  private executeSupaBiz() {
    const queryMaster = this.supabase.getMasterById(this.masterId);
    const queryExperiences = this.supabase.getMasterHeroes(this.masterId);
    console.log('AAA1');
    this.loadingService.start();

    return forkJoin([from(queryMaster), from(queryExperiences)]).subscribe(
      (response: any) => {
        console.log('AAA2');

        this.loadingService.stop();
        var selMast = response[0].data[0] as Master;
        var mapped = response[1].data.map(function (obj: any) {
          return obj.j;
        });
        selMast.heroes = mapped;
        this.master = selMast;
        this.master.heroes?.sort((a, b) => {
          const dateA = new Date(a.event_date);
          const dateB = new Date(b.event_date);
          return dateB.getTime() - dateA.getTime();
        });
      }
    );
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
