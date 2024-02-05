import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { CleanFile } from 'src/app/actions/file.action';
import { SetProfile } from 'src/app/actions/profiles.action';
import { ImageHelp } from 'src/app/model/image';
import { LoaderService } from 'src/app/services/loader.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';
import { openCropperDialog } from 'src/app/utils/dialog.utils';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-profilemanager',
  templateUrl: './profilemanager.component.html',
  styleUrls: ['./profilemanager.component.css'],
})
export class ProfilemanagerComponent implements OnInit {
  @Select(HeroState.getImageFile) imageHelp?: Observable<ImageHelp>;

  message?: string;
  status?: boolean;
  bucket: string = 'avatars';

  file?: File;
  imageSrc?: string;
  name?: string;
  myUser?: MyProfile;

  @Input()
  session!: AuthSession;

  @Select(HeroState.getUserProfile) userProfile?: Observable<MyProfile>;

  constructor(
    public dialog: MatDialog,
    private readonly supabase: SupabaseService,
    private store: Store,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
    this.userProfile?.subscribe((us) => {
      if (us) {
        this.myUser = us;
        this.imageSrc =
          'https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/' +
          this.myUser.avatar_url;
      }
    });

    this.imageHelp?.subscribe((img) => {
      if (img != undefined) {
        this.file = img.imageFile;
        this.name = img.imageName;
        this.imageSrc = img.imageSrc;
        this.store.dispatch(new CleanFile());
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PopupComponent, {
      duration: 2 * 1000,
    });
  }

  saveProfile(): void {
    console.log('save');
    this.loadingService.start();

    if (this.myUser) {
      this.uploadFile();
    }
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
            if (this.myUser) {
              this.myUser.avatar_url = this.file.name;
            }
            if (this.status) {
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
    if (this.myUser) {
      this.store.dispatch(new SetProfile(this.myUser)).subscribe(() => {
        this.openSnackBar();
        this.loadingService.stop();
      });
    }
  }

  handleOpenDialog(): void {
    openCropperDialog(this.dialog);
  }
}
