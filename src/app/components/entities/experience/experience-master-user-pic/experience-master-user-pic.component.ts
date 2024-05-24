import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-master-user-pic',
  templateUrl: './experience-master-user-pic.component.html',
  styleUrls: ['./experience-master-user-pic.component.css'],
})
export class ExperienceMasterUserPicComponent implements OnInit {
  @Input()
  profile_url?: string;

  @Input()
  master_url?: string;

  constructor() {}

  ngOnInit(): void {}
}
