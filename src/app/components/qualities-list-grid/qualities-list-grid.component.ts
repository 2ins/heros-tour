import { Component, Input, OnInit } from '@angular/core';
import { Quality } from 'src/app/model/quality';

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

  constructor() {}

  ngOnInit(): void {}
}
