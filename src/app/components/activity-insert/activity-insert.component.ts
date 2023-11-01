import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AddActivity, GetAllActivities } from 'src/app/actions/activity.action';
import { ActivityTable } from 'src/app/model/activity';
import { SupabaseService } from 'src/app/supabase.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-activity-insert',
  templateUrl: './activity-insert.component.html',
  styleUrls: ['./activity-insert.component.css'],
})
export class ActivityInsertComponent implements OnInit {
  newActivity: ActivityTable = {
    description: '',
    name: '',
  };

  @Input()
  isDialog: boolean = false;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private readonly supabase: SupabaseService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    var activity = history.state.activity;
    console.log('activity', activity);
    if (activity) {
      this.newActivity = {
        id: activity.id,
        description: activity.description,
        name: activity.name,
        img_url: activity.img_url,
      };
    }
    this.imageSrc =
      'https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/' +
      activity.img_url;
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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  //--//
  imageSrc?: string;
  status?: boolean;
  file?: File;
  name?: string;
  bucket: string = 'avatars';

  message?: string;

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
}
