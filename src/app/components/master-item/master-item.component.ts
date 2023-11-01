import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Master } from 'src/app/model/master';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-master-item',
  templateUrl: './master-item.component.html',
  styleUrls: ['./master-item.component.css'],
})
export class MasterItemComponent implements OnInit {
  @Input()
  user?: Master;

  @ViewChild('mrImgElement', { static: false }) mrImgElementRef!: ElementRef;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get imageUrl(): string {
    return `url('https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/${this.user?.avatar_url}')`;
  }

  onSelect(u: Master): void {
    this.router.navigate(['/masters/master/', u.id]);
  }
  ngAfterViewInit() {
    //this.calculateImageClass();
  }

  calculateImageClass() {
    const mrImg: HTMLImageElement = this.mrImgElementRef.nativeElement;
    const imageClass =
      mrImg.width >= mrImg.height ? 'profile-pic-height' : 'profile-pic-width';
    mrImg.classList.add(imageClass);
    console.log(this.user?.name + ' - ' + imageClass);
  }
}
