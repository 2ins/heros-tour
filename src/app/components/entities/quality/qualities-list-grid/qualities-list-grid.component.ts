import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input()
  total?: number;

  @Input()
  showMore?: Boolean;

  @Input()
  showAll?: Boolean = false;

  toView: number = 5;

  showEnabled: boolean = false;
  isMobile: boolean = false;

  constructor(private mobileSerive: MobileService, private route: Router) {
    this.isMobile = mobileSerive.isMobile();

    this.showEnabled = false;
  }

  ngOnInit(): void {
    if (this.qualities && this.qualities?.length > this.toView) {
      this.showEnabled = true;
    }

    if (this.isMobile) {
      if (!this.showAll) {
        this.toView = 3;
      } else {
        this.toView = 24;
      }
    }
    if (this.qualities) {
      if (this.qualities?.length > this.toView) {
        this.showEnabled = true;
      } else {
        this.showEnabled = false;
      }
    }
  }

  showChange(): void {
    this.showMore = !this.showMore;
  }

  @Output() notifySelection: EventEmitter<any> = new EventEmitter();
  onClick(q: Quality): void {
    if (this.showAll == true) {
      this.notifySelection.emit(q);
    } else {
      this.go(q);
    }
  }

  go(q: Quality) {
    var routerLink = '/qualities/quality/' + q.id;
    this.route.navigateByUrl(routerLink);
  }
}
