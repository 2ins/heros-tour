import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Hero } from 'src/app/model/hero';
import { Quality } from 'src/app/model/quality';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-qualities-list-vertical',
  templateUrl: './qualities-list-vertical.component.html',
  styleUrls: ['./qualities-list-vertical.component.css'],
})
export class QualitiesListVerticalComponent implements OnInit {
  @Input()
  qualities?: Quality[] = [];

  @Input()
  hero?: Hero;

  @Input()
  total?: number;

  @Input()
  showAll?: Boolean = false;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private route: Router
  ) {}

  @Output() notifySelection: EventEmitter<any> = new EventEmitter();
  onClick(q: Quality): void {
    if (this.showAll == true) {
      this.notifySelection.emit(q);
    } else {
      var routerLink = '/qualities/quality/' + q.id;
      this.route.navigateByUrl(routerLink);
    }
  }

  openDetail(q: Quality) {
    var routerLink = '/qualities/quality/' + q.id;
    this.route.navigateByUrl(routerLink);
  }

  ngOnInit(): void {}
}
