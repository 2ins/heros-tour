import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MobileService } from 'src/app/services/mobile.service';
import * as descs from '../../../../../assets/strenghts_desc.json';
import { GetQualities } from '../../../../actions/quality.action';
import { Quality } from '../../../../model/quality';
import { HeroState } from '../../../../states/todo.state';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css'],
})
export class QualityComponent implements OnInit {
  qualityId?: any;
  quality?: Quality;
  editMode?: Boolean = false;
  isMobile: boolean = false;

  data: any = descs;
  qualityDesc: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private route: Router,
    private location: Location,
    public mobileService: MobileService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isMobile = this.mobileService.isMobile();
    this.document.documentElement.scrollTop = 0;
  }
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      this.qualityId = map.get('id');

      console.log(this.qualityId);
      console.log(map);
      var index = this.qualityId - 1;
      this.qualityDesc = this.data[index].title;
      console.log(this.qualityDesc);
    });

    this.qualities?.subscribe((h) => {
      if (h) {
        if (h.length == 0) {
          this.store.dispatch(new GetQualities());
        } else {
          this.quality = h.find((x) => x.id == this.qualityId);
        }
      }
    });

    //this.qualityId = this.activatedRoute.snapshot.paramMap.get('id');

    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.editMode = Boolean(param.get('edit'));
    });

    this.activatedRoute.data.subscribe((data) => {
      console.log('data', data);
    });
  }

  appendQueryParam() {
    this.route.navigate(['/qualities/quality/', this.qualityId], {
      queryParams: { edit: true },
    });
  }

  backClicked() {
    this.location.back();
  }
}
