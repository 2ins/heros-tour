import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AddFile } from 'src/app/actions/file.action';
import { ImageHelp } from 'src/app/model/image';

@Component({
  selector: 'app-image-cropper-util',
  templateUrl: './image-cropper-util.component.html',
  styleUrls: ['./image-cropper-util.component.css'],
})
export class ImageCropperUtilComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private store: Store) {}

  @ViewChild('fileInput', { static: true })
  fileInput?: ElementRef;
  ngOnInit(): void {
    this.fileInput?.nativeElement.click();
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
      //TODO
    }
  }

  select(): void {
    if (this.file && this.name) {
      var img: ImageHelp = {
        imageFile: this.file,
        imageName: this.name,
        imageSrc: this.imageSrc,
      };
      this.store.dispatch(new AddFile(img));
    }
  }
}
