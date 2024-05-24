import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Master } from 'src/app/model/master';
import { Search } from 'src/app/model/search';
import { HeroState } from 'src/app/states/todo.state';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-master-item',
  templateUrl: './master-item.component.html',
  styleUrls: ['./master-item.component.css'],
})
export class MasterItemComponent implements OnInit {
  @Input()
  user?: Master;

  @Select(HeroState.getActivitySearch) search?: Observable<Search>;

  theSearch?: Search;

  @ViewChild('mrImgElement', { static: false }) mrImgElementRef!: ElementRef;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.search?.subscribe((x) => {
      this.theSearch = x;
    });
  }

  get imageUrl(): string {
    return `url('https://enrgmsdppekwfvmbdxsl.supabase.co/storage/v1/object/public/avatars/${this.user?.avatar_url}')`;
  }

  onSelect(u: Master): void {
    this.router.navigate(['/masters/master/', u.id]);
  }
  ngAfterViewInit() {
    //this.calculateImageClass();
  }
}
