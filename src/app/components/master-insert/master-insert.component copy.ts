import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, map } from 'rxjs';
import { GetAllActivities } from 'src/app/actions/activity.action';
import { AddMaster } from 'src/app/actions/master.action';
import { Activity, ActivityTable } from 'src/app/model/activity';
import { MasterActivityTable, MasterTable } from 'src/app/model/master';
import { LoaderService } from 'src/app/services/loader.service';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';
import { ActivityMasterInsertComponent } from '../activity-master-insert/activity-master-insert.component';
import { ActivityMasterSearchComponent } from '../activity-master-search/activity-master-search.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-master-insert',
  templateUrl: './master-insert.component.html',
  styleUrls: ['./master-insert.component.css'],
})
export class MasterInsertComponent implements OnInit {
  @Select(HeroState.getAllActivities) activities?: Observable<ActivityTable[]>;
  //@Select(HeroState.getSelectedMaster) selectedMaster?: Observable<Master>;
  @Select(HeroState.getAddedMaster) addedMaster?: Observable<MasterTable>;

  message?: string;
  status?: boolean;
  bucket: string = 'avatars';
  _avatarUrl: SafeResourceUrl | undefined;
  file?: File;
  imageSrc?: string;
  name?: string;
  preselectedActivities: Activity[] = [];

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
  ) {
    console.log('constructor');
  }

  ngOnInit(): void {
    var master = history.state.master;

    if (master) {
      console.log('master selected to edit', master);
      this.preselectedActivities = master.activities;
      this.newMaster = {
        id: master.id,
        name: master.name,
        avatar_url: master.avatar_url,
        website: master.website,
      };
      this.imageSrc =
        'https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/' +
        master.avatar_url;
    }

    console.log('preselectedActivities', this.preselectedActivities);

    this.store.dispatch(new GetAllActivities());
    this.activities?.subscribe((as) => {
      if (as && as.length != 0) {
        as.forEach((e) => {
          e.selected = false;
          this.preselectedActivities.forEach((pr) => {
            console.log(pr.id, e.id);
            if (pr.id == e.id) {
              console.log('yes');
              e.selected = true;
            }
          });
        });
      } else {
      }
    });

    this.addedMaster?.subscribe((e) => {
      console.log('aggiornamento: ', e);
    });
  }

  save(): void {
    console.log('save', this.newMaster);
    if (this.newMaster) {
      this.uploadFile();
    }
  }
  updateItem(a: ActivityTable): void {
    a.selected = !a.selected;
    console.log('a.selected', a.selected);
    if (a.selected) {
      var act: Activity;
      if (a.id && a.name) {
        act = { id: a.id, name: a.name };
        this.preselectedActivities.push(act);
      }
    } else {
      var toDelete = this.preselectedActivities.find((e) => e.id == a.id);
      console.log('toDelet', toDelete);
      if (toDelete) {
        const index = this.preselectedActivities.indexOf(toDelete, 0);
        console.log('index,', index);
        if (index > -1) {
          this.preselectedActivities.splice(index, 1);
        }
      }
    }

    console.log('this.preselectedActivities', this.preselectedActivities);
  }

  isAlreadySelected(a: ActivityTable): boolean {
    var found = this.preselectedActivities.find((e) => e.id == a.id);
    if (found) {
      return true;
    }
    return false;
  }

  backClicked() {
    this.location.back();
  }

  open(type: string) {
    //this.router.navigateByUrl('/addActivity');
    this.openDialog(type);
  }

  //

  //

  //

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

  async downloadImage(path: string) {
    try {
      console.log('downloadImage 1');
      const { data } = await this.supabase.downLoadImage(path);
      if (data instanceof Blob) {
        console.log('downloadImage 2');
        this._avatarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(data)
        );
        console.log(this._avatarUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message);
      }
    }
  }

  //

  //

  //
  //utilities
  getArr(): number[] {
    var arr: number[] = [];
    if (this.activities) {
      this.activities
        .pipe(
          map((array: ActivityTable[]) => {
            array.forEach((item: ActivityTable) => {
              if (item.selected) {
                if (item.id) {
                  arr.push(item.id);
                }
              }
            });
          })
        )
        .subscribe();
    }
    return arr;
  }

  doBis() {
    var arr = this.getArr();

    //add hero_qualities to the heroTable
    var appo: MasterActivityTable[] = [];
    arr.forEach(async (a) => {
      var ma: MasterActivityTable = {
        id_activity: a,
      };
      appo.push(ma);
    });
    this.newMaster.arr = appo;
    this.store.dispatch(new AddMaster(this.newMaster)).subscribe(() => {
      this.openSnackBar();
      var id = this.store.selectSnapshot(HeroState.getAddedMaster)?.id;
      console.log('id..........', id);
      if (id) {
        this.router.navigateByUrl('/masters/master/' + id);
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PopupComponent, {
      duration: 2 * 1000,
    });
  }

  openDialog(type: string) {
    //this.textElem?.nativeElement.blur();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = '{padding-top:0px;}';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';

    var dialogRef;
    if (type == 'INSERT') {
      dialogRef = this.dialog.open(ActivityMasterInsertComponent, dialogConfig);
    } else {
      dialogRef = this.dialog.open(ActivityMasterSearchComponent, dialogConfig);
    }

    //dialogRef.componentInstance.placeHolder = 'Search activities';

    const sub = dialogRef.componentInstance.onAdd.subscribe(
      (x: ActivityTable) => {
        console.log('ecchelo', x);
        if (!this.isAlreadySelected(x)) {
          this.updateItem(x);
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onAdd
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //Corpper
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
