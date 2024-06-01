import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MobileService } from 'src/app/services/mobile.service';
import { ActivitySearchComponent } from '../entities/activity/activity-search/activity-search.component';
import { ExperienceInsertOverviewComponent } from '../entities/experience/experience-insert-overview/experience-insert-overview.component';
import { SearchCompositeComponent } from '../search-composite/search-composite.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dialogConfig = new MatDialogConfig();
  isMobile: boolean = false;

  constructor(public dialog: MatDialog, private mobile: MobileService) {}

  ngOnInit(): void {
    this.isMobile = this.mobile.isMobile();
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.dialogConfig.panelClass = 'full-screen-modal';
    this.dialogConfig.maxHeight = '100vh';
    this.dialogConfig.maxWidth = '100vw';
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      SearchCompositeComponent,
      this.dialogConfig
    );
    //dialogRef.componentInstance.placeHolder = 'Search activities';

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSearchMaster() {
    this.dialogConfig.data = { type: 'search' };
    const dialogRef = this.dialog.open(
      ExperienceInsertOverviewComponent,
      this.dialogConfig
    );
  }

  openAddExperience() {
    this.dialogConfig.data = { type: 'addxp' };
    const dialogRef = this.dialog.open(
      ExperienceInsertOverviewComponent,
      this.dialogConfig
    );
  }

  openSearchActivity() {
    this.dialogConfig.data = { type: 'search' };
    const dialogRef = this.dialog.open(
      ActivitySearchComponent,
      this.dialogConfig
    );
  }
}
