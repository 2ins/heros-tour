import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { GetActivitiesOverview } from 'src/app/actions/activity.action';
import { AddMaster } from 'src/app/actions/master.action';
import { Activity } from 'src/app/model/activity';
import { MasterActivityTable, MasterTable } from 'src/app/model/master';
import { Search } from 'src/app/model/search';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-master-insert',
  templateUrl: './master-insert.component.html',
  styleUrls: ['./master-insert.component.css'],
})
export class MasterInsertComponent implements OnInit {
  @Select(HeroState.getActivities) activities?: Observable<Activity[]>;

  message?: string;
  status?: boolean;
  bucket: string = 'avatars';
  _avatarUrl: SafeResourceUrl | undefined;
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
    private readonly dom: DomSanitizer
  ) {
    console.log('constructor');
  }

  ngOnInit(): void {
    var preselectedActivities: Activity[] = [];

    var master = history.state.master;

    if (master) {
      console.log('master selected to edit', master);
      preselectedActivities = master.activities;
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

    console.log('preselectedActivities', preselectedActivities);

    var search: Search = { search: '', arr: [] };
    this.store.dispatch(new GetActivitiesOverview(search));
    this.activities?.subscribe((as) => {
      if (as && as.length != 0) {
        as.forEach((e) => {
          e.selected = false;
          preselectedActivities.forEach((pr) => {
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
  }

  save(): void {
    console.log('save', this.newMaster);
    if (this.newMaster) {
      this.uploadFile();
    }
  }
  updateItem(a: Activity): void {
    a.selected = !a.selected;
    console.log('selected: ', a);
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
        this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(
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
          map((array: Activity[]) => {
            array.forEach((item: Activity) => {
              if (item.selected) {
                arr.push(item.id);
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
    this.store.dispatch(new AddMaster(this.newMaster));
  }
}
