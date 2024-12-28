import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-free-qualities-prospect',
  templateUrl: './free-qualities-prospect.component.html',
  styleUrls: ['./free-qualities-prospect.component.css'],
})
export class FreeQualitiesProspectComponent implements OnInit {
  go(q: any) {
    var routerLink = '/experiences/experience/' + q.exp_id;
    this.route.navigateByUrl(routerLink);
  }
  open(c: any) {
    if (c.selected) {
      c.selected = false;
    } else {
      c.selected = true;
    }
  }
  miomet(q: any) {
    //console.log('json', q);
    this.quality = q;
  }
  @Input()
  freequalities: any[] = [];
  visibleQualities: any[] = [];
  showAll: boolean = false;
  quality?: any;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.visibleQualities = [];
  }

  showAllQualities() {
    if (!this.showAll) {
      this.visibleQualities = [...this.freequalities];
    } else {
      this.visibleQualities = this.freequalities;
    }
    this.showAll = !this.showAll;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['freequalities']) {
      console.log('Dati aggiornati:', this.freequalities);
      this.visibleQualities = this.freequalities;
    }
  }
}
