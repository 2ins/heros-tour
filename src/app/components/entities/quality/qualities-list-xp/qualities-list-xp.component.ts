import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Quality } from 'src/app/model/quality';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-qualities-list-xp',
  templateUrl: './qualities-list-xp.component.html',
  styleUrls: ['./qualities-list-xp.component.css'],
})
export class QualitiesListXpComponent implements OnInit {
  constructor(
    private scrollService: ScrollService,
    private cdr: ChangeDetectorRef
  ) {}

  @Input()
  qualities?: Quality[] = [];

  @Input()
  preselected?: number;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['qualities'] || changes['preselected']) {
      this.movePreselectedToTop();
    }
  }

  private movePreselectedToTop(): void {
    if (this.qualities && this.preselected !== undefined) {
      console.log('this.preselected', this.preselected);
      const index = this.qualities.findIndex((q) => q.id == this.preselected);
      console.log('index ', index);
      if (index !== -1) {
        const [preselectedQuality] = this.qualities.splice(index, 1);
        console.log('preselectedQuality', preselectedQuality);
        this.qualities.unshift(preselectedQuality);
      }
    }
  }
}
