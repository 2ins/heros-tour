import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quality } from 'src/app/model/quality';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-qualities-horizontal-compact',
  templateUrl: './qualities-horizontal-compact.component.html',
  styleUrls: ['./qualities-horizontal-compact.component.css'],
})
export class QualitiesHorizontalCompactComponent implements OnInit {
  @Input()
  qualities?: Quality[] = [];
  chunks?: any[] = [];

  selected?: Quality;

  chunkSelected?: any;

  @Input()
  showMore?: Boolean = false;

  @Input()
  total?: number;

  @Input()
  rows: number = 5;

  constructor(private ms: MobileService) {
    if (ms.isMobile()) {
      this.rows = 3;
    }
  }

  ngOnInit(): void {
    if (this.qualities) {
      this.chunks = this.getChunks(this.qualities, this.rows);
    }
  }

  @Output() notifySelection = new EventEmitter<Quality>();
  onClick(quality: Quality, ch: any): void {
    quality.discovered = true;

    if (quality === this.selected) {
      this.selected = undefined;
      if (this.chunkSelected != null) {
        this.chunkSelected = null;
      } else {
        this.chunkSelected = ch;
      }
    } else {
      this.selected = quality;
      this.chunkSelected = ch;
    }

    this.notifySelection.emit(quality);
  }

  go(q: Quality, ch: any): void {
    this.onClick(q, ch);
  }

  getChunks<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  isChunkSelected(row: any, chunkSelected: any): boolean {
    var x = this.selected && row === chunkSelected;
    if (x) return x;
    return false;
  }
  showChange(): void {
    this.showMore = !this.showMore;
    if (!this.showMore) {
      const sezione = document.getElementById('xButton');
      sezione?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
