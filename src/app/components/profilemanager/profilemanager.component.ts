import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SetProfile } from 'src/app/actions/profiles.action';
import { HeroState } from 'src/app/states/todo.state';
import { Profile, SupabaseService } from 'src/app/supabase.service';

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

  @Input()
  session!: AuthSession;

  @Select(HeroState.getUserProfile) userProfile?: Observable<Profile>;

  myUser?: Profile;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly dom: DomSanitizer,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userProfile?.subscribe((us) => {
      if (us) {
        this.myUser = us;
        this.downloadImage(us.avatar_url);
        console.log('us.avatar_url', us.avatar_url);
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

    this.supabase.upload(this.bucket, name, file).then((data) => {
      if (data.error) {
        this.message = `Error send message ${data.error.message}`;
      } else {
        console.log(data.data);
        this.message = `File ${file.name} uploaded with success!`;
        if (this.myUser) {
          this.myUser.avatar_url = file.name;
          console.log(file);
          this.downloadImage(this.myUser.avatar_url);
        }
      }
      this.status = false;
    });
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

  saveProfile(): void {
    console.log('save');
    if (this.myUser) {
      this.store.dispatch(new SetProfile(this.myUser));
    }
  }
}
