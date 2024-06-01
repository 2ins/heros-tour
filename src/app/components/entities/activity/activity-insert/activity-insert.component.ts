import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddActivity, GetAllActivities } from 'src/app/actions/activity.action';
import { CleanFile } from 'src/app/actions/file.action';
import { ActivityTable } from 'src/app/model/activity';
import { ImageHelp } from 'src/app/model/image';
import { MobileService } from 'src/app/services/mobile.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';
import { openCropperDialog } from 'src/app/utils/dialog.utils';
import { PopupComponent } from '../../../popup/popup.component';

@Component({
  selector: 'app-activity-insert',
  templateUrl: './activity-insert.component.html',
  styleUrls: ['./activity-insert.component.css'],
})
export class ActivityInsertComponent implements OnInit {
  @Select(HeroState.getImageFile) imageHelp?: Observable<ImageHelp>;

  newActivity: ActivityTable = {
    description: '',
    name: '',
  };

  @Input()
  isDialog: boolean = false;
  isMobile: boolean = false;
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private readonly supabase: SupabaseService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private mobile: MobileService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.mobile.isMobile();
    var activity = history.state.activity;
    console.log('activity', activity);
    if (activity) {
      this.newActivity = {
        id: activity.id,
        description: activity.description,
        name: activity.name,
        img_url: activity.img_url,
      };
      this.imageSrc =
        'https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/' +
        activity.img_url;
    }

    this.imageHelp?.subscribe((img) => {
      console.log('calling');
      if (img != undefined) {
        this.file = img.imageFile;
        this.name = img.imageName;
        this.imageSrc = img.imageSrc;
        this.store.dispatch(new CleanFile());
      }
      console.log('img', img);
    });
  }

  save(): void {
    console.log('save', this.newActivity);
    if (this.newActivity) {
      this.uploadFile();
    }
  }
  backClicked() {
    this.location.back();
  }

  //CROPPER
  //Corpper
  /* cropper */

  //--//
  imageSrc?: string;
  status?: boolean;
  file?: File;
  name?: string;
  bucket: string = 'avatars';

  message?: string;

  //bisness add f cropper
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
            this.newActivity.img_url = this.file.name;
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
    this.store.dispatch(new AddActivity(this.newActivity)).subscribe(() => {
      this.openSnackBar();
      this.store.dispatch(new GetAllActivities());
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PopupComponent, {
      duration: 2 * 1000,
    });
  }

  handleOpenDialog(): void {
    openCropperDialog(this.dialog);
  }
}
