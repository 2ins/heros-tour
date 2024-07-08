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

  @Input()
  profile_id?: string;

  isRepo: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.profile_id == '1ed79d05-52f2-4cea-9cc7-bba7d34aa420') {
      this.isRepo = true;
    }
  }
}
