import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/hero';

@Component({
  selector: 'app-experience-master-user-pic',
  templateUrl: './experience-master-user-pic.component.html',
  styleUrls: ['./experience-master-user-pic.component.css'],
})
export class ExperienceMasterUserPicComponent implements OnInit {
  @Input()
  hero?: Hero;

  constructor() {}

  ngOnInit(): void {}
}
