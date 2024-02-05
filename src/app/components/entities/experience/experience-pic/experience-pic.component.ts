import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/hero';

@Component({
  selector: 'app-experience-pic',
  templateUrl: './experience-pic.component.html',
  styleUrls: ['./experience-pic.component.css'],
})
export class ExperiencePicComponent implements OnInit {
  @Input()
  hero?: Hero;

  constructor() {}

  ngOnInit(): void {}
}
