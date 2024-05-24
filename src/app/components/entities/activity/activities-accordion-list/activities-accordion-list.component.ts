import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quality } from 'src/app/model/quality';

@Component({
  selector: 'app-activities-accordion-list',
  templateUrl: './activities-accordion-list.component.html',
  styleUrls: ['./activities-accordion-list.component.css'],
})
export class ActivitiesAccordionListComponent implements OnInit {
  open(id: number) {
    this.route.navigate(['/activities/activity/', id]);
  }
  constructor(private route: Router) {}

  @Input()
  quality?: Quality;

  @Input()
  showMore?: Boolean;

  ngOnInit(): void {
    this.quality?.activities?.sort(
      (a, b) =>
        ((b.count || 1) * 100) / (b.xps_count || 1) -
        ((a.count || 1) * 100) / (a.xps_count || 1)
    );
  }

  showChange(): void {
    this.showMore = !this.showMore;
    if (!this.showMore) {
      const sezione = document.getElementById('xButton');
      sezione?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
