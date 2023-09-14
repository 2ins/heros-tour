import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SetProfile } from 'src/app/actions/profiles.action';
import { HeroState } from 'src/app/states/todo.state';
import { MyProfile, SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-profilemanager',
  templateUrl: './profilemanager.component.html',
  styleUrls: ['./profilemanager.component.css'],
})
export class ProfilemanagerComponent implements OnInit {
  message?: string;
  status?: boolean;
  bucket: string = 'avatars';
  _avatarUrl: SafeResourceUrl | undefined;

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
    private readonly dom: DomSanitizer,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userProfile?.subscribe((us) => {
      if (us) {
        this.myUser = us;
        //this.downloadImage(us.avatar_url);
        console.log('us.avatar_url', us.avatar_url);
        /*
        this.imageSrc =
          'https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/' +
          us.avatar_url;
           */
      }
    });
  }

  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length == 0) {
      this.message = 'You must select an image to upload.';
      return;
    }

    this.status = true;
    const file: File = input.files[0];
    const name = file.name.replace(/ /g, '');
  }

  saveProfile(): void {
    console.log('save');

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
  doBis() {
    if (this.myUser) {
      this.store.dispatch(new SetProfile(this.myUser));
    }
  }
}
