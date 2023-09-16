import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { ImageCroppedEvent } from 'node_modules/ngx-image-cropper';
import { Observable } from 'rxjs';
import { SetProfile } from 'src/app/actions/profiles.action';
import { LoaderService } from 'src/app/services/loader.service';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-profilemanager',
  templateUrl: './profilemanager.component.html',
  styleUrls: ['./profilemanager.component.css'],
})
export class ProfilemanagerComponent implements OnInit {
  message?: string;
  status?: boolean;
  bucket: string = 'avatars';
  //_avatarUrl: SafeResourceUrl | undefined;

  ///
  file?: File;
  imageSrc?: string;
  name?: string;
  myUser?: MyProfile;

  @Input()
  session!: AuthSession;

  @Select(HeroState.getUserProfile) userProfile?: Observable<MyProfile>;

  constructor(
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
        console.log('us.avatar_url', us.avatar_url);
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

  previewImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.status = true;
    this.file = event.target.files[0];
    if (this.file) {
      this.name = this.file.name.replace(/ /g, '');
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
              console.log('SON QUI, ' + this.myUser);
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

  async downloadImage(path: string) {
    try {
      console.log('downloadImage 1');
      const { data } = await this.supabase.downLoadImage(path);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message);
      }
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

  /* cropper */
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl != undefined || event.objectUrl != null) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl
      );
      console.log(event);
      if (event.blob) {
        this.name = this.makeid(20) + '.png';
        var f = this.blobToFile(event.blob, this.name);
        console.log(f);

        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(f);

        this.status = true;
        this.file = f;
      }
    }

    // event.blob can be used to upload the cropped image
  }
  imageLoaded() {
    //this.showCropper = true;
    console.log('Image loaded');
  }
  cropperReady() {
    console.log(this.croppedImage);
  }
  loadImageFailed() {
    // show message
  }
  public blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return theBlob as File;
  };

  makeid(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
