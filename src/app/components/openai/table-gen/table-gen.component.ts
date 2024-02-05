import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { TableRow } from 'src/app/model/gpt-parser';
import { TableParserService } from 'src/app/services/table-parser-service.service';

@Component({
  selector: 'app-table-gen',
  templateUrl: './table-gen.component.html',
  styleUrls: ['./table-gen.component.css'],
})
export class TableGenComponent {
  @Input('')
  tableText: string = '';

  tableRows: TableRow[];

  constructor(
    private parserService: TableParserService,
    private cdr: ChangeDetectorRef
  ) {
    this.tableRows = this.parserService.parseTableText(this.tableText);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableText']) {
      console.log('eccomi');
      this.tableRows = this.parserService.parseTableText(this.tableText);
    }
  }

  click() {
    console.log('this.tableText', this.tableText);
    this.tableRows = this.parserService.parseTableText(this.tableText);
  }
}
