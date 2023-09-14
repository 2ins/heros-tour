import { Component, Input, OnInit } from '@angular/core';
import { Quality } from 'src/app/model/quality';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-qualities-list-grid',
  templateUrl: './qualities-list-grid.component.html',
  styleUrls: ['./qualities-list-grid.component.css'],
})
export class QualitiesListGridComponent implements OnInit {
  @Input()
  qualities?: Quality[] = [];
  qualitiesView?: Quality[] = [];

  @Input()
  total?: number;

  toView: number = 8;
  showMore: boolean = false;
  showEnabled: boolean = false;
  isMobile: boolean = false;

  constructor(private mobileSerive: MobileService) {
    this.isMobile = mobileSerive.isMobile();
  }

  ngOnInit(): void {
    this.showMore = false;
    this.qualitiesView = this.qualities;
    if (this.isMobile) {
      this.toView = 4;
    }
    if (this.qualities) {
      if (this.qualities?.length > this.toView) {
        this.qualities = this.qualities?.slice(0, this.toView);
        this.showEnabled = true;
      } else {
        this.qualities = this.qualities;
        this.showEnabled = false;
      }
    }
  }

  ngBeforeViewInit() {
    this.qualitiesView = this.qualities;
  }

  showChange(): void {
    this.showMore = !this.showMore;
    if (this.showMore == true) {
      this.qualities = this.qualitiesView;
    } else {
      this.qualities = this.qualitiesView?.slice(0, this.toView);
    }
  }
}
