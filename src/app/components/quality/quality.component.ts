import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MobileService } from 'src/app/services/mobile.service';
import { GetQualities } from '../../actions/quality.action';
import { Quality } from '../../model/quality';
import { HeroState } from '../../states/todo.state';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private route: Router,
    private location: Location,
    public mobileService: MobileService
  ) {}
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile();
    this.activatedRoute.paramMap.subscribe((map) => {
      this.qualityId = map.get('id');
      console.log(this.qualityId);
      console.log(map);
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
