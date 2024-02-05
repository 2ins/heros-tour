import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CleanFile } from 'src/app/actions/file.action';
import {
  AddMasterTransaction,
  SetAddedMaster,
} from 'src/app/actions/master.action';
import { ActivityTable } from 'src/app/model/activity';
import { ImageHelp } from 'src/app/model/image';
import { MasterActivityTable, MasterTable } from 'src/app/model/master';
import { LoaderService } from 'src/app/services/loader.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';
import { openCropperDialog } from 'src/app/utils/dialog.utils';
import { PopupComponent } from '../../../popup/popup.component';
import { ActivityMasterInsertComponent } from '../../activity/activity-master-insert/activity-master-insert.component';
import { ActivityMasterSearchComponent } from '../../activity/activity-master-search/activity-master-search.component';

@Component({
  selector: 'app-master-insert',
  templateUrl: './master-insert.component.html',
  styleUrls: ['./master-insert.component.css'],
})
export class MasterInsertComponent implements OnInit {
  @Select(HeroState.getAllActivities) activities?: Observable<ActivityTable[]>;
  @Select(HeroState.getAddedMaster) addedMaster?: Observable<MasterTable>;
  @Select(HeroState.getImageFile) imageHelp?: Observable<ImageHelp>;

  //message e status relative to file updload
  message?: string;
  status?: boolean;
  bucket: string = 'avatars';
  //image instance
  file?: File;
  imageSrc?: string;
  name?: string;

  newMaster: MasterTable = {
    name: '',
    avatar_url: '',
    website: '',
  };

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private loadingService: LoaderService,
    private location: Location,
    public dialog: MatDialog
  ) {}

  handleOpenDialog(): void {
    openCropperDialog(this.dialog);
  }

  ngOnInit(): void {
    var master = history.state.master;

    if (master) {
      this.newMaster = {
        id: master.id,
        name: master.name,
        avatar_url: master.avatar_url,
        website: master.website,
        preselectedActivities: master.activities,
      };
      this.imageSrc =
        'https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/' +
        master.avatar_url;

      this.store.dispatch(new SetAddedMaster(this.newMaster));
    }

    this.addedMaster?.subscribe((e) => {});

    this.imageHelp?.subscribe((img) => {
      if (img != undefined) {
        this.file = img.imageFile;
        this.name = img.imageName;
        this.imageSrc = img.imageSrc;
        this.store.dispatch(new CleanFile());
      }
    });
  }

  save(): void {
    if (this.newMaster) {
      this.uploadFile();
    }
  }

  backClicked() {
    this.location.back();
  }

  open(type: string) {
    this.openDialog(type);
  }

  uploadFile() {
    if (this.file && this.name) {
      this.supabase.upload(this.bucket, this.name, this.file).then((data) => {
        if (data.error) {
          this.message = `Error send message ${data.error.message}`;
          this.status = false;
        } else {
          console.log(data.data);
          if (this.file) {
            this.message = `File ${this.file.name} uploaded with success!`;
            this.status = true;
            this.newMaster.avatar_url = this.file.name;
            if (this.status) {
              console.log('rottura di cazzo');
              this.doBis();
            }
          }
        }
      });
    }
    //there is not file to upload
    else {
      this.doBis();
    }
  }

  doBis() {
    var appo: MasterActivityTable[] = [];
    if (this.newMaster.preselectedActivities) {
      appo = this.newMaster.preselectedActivities?.map(
        (e) => ({ id_activity: e.id } as MasterActivityTable)
      );
    }
    const copiedArray = [...appo];
    this.newMaster.arr = copiedArray;
    var copy = JSON.parse(JSON.stringify(this.newMaster));
    this.store.dispatch(new AddMasterTransaction(copy)).subscribe(() => {
      this.openSnackBar();
      var id = this.store.selectSnapshot(HeroState.getAddedMaster)?.id;
      if (id) {
        this.router.navigateByUrl('/masters/master/' + id);
      }
    });
  }

  //popup ok after save
  openSnackBar() {
    this._snackBar.openFromComponent(PopupComponent, {
      duration: 2 * 1000,
    });
  }

  //dialog managment
  openDialog(type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = '{padding-top:0px;}';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';

    var dialogRef;
    this.store.dispatch(new SetAddedMaster(this.newMaster));
    if (type == 'INSERT') {
      dialogRef = this.dialog.open(ActivityMasterInsertComponent, dialogConfig);
    } else {
      dialogRef = this.dialog.open(ActivityMasterSearchComponent, dialogConfig);
    }

    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onAdd
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
