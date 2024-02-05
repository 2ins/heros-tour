import { Component, Input, OnInit } from '@angular/core';
import { Quality } from 'src/app/model/quality';

@Component({
  selector: 'app-qualities-accordion-list',
  templateUrl: './qualities-accordion-list.component.html',
  styleUrls: ['./qualities-accordion-list.component.css'],
})
export class QualitiesAccordionListComponent implements OnInit {
  @Input()
  qualities?: Quality[] = [];

  @Input()
  tot_xps?: number;

  @Input()
  showMore?: Boolean;

  constructor() {}

  ngOnInit(): void {}

  showChange(): void {
    this.showMore = !this.showMore;
    if (!this.showMore) {
      const sezione = document.getElementById('xButton');
      sezione?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
