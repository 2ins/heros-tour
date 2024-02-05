import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import OpenAI from 'openai';
import { TableRow } from 'src/app/model/gpt-parser';
import { OpenAIServiceService } from 'src/app/services/open-aiservice.service';
import { TableParserService } from 'src/app/services/table-parser-service.service';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css'],
})
export class ChatInterfaceComponent implements OnInit {
  prompt = '';
  response?: any;
  response2: any;
  question_header: string = '';
  question_tab1: string = '';
  question_tab2: string = '';
  question_footer: string = '';
  question_header_footer: string = '';

  rows: TableRow[] = [];

  constructor(
    private openaiService: OpenAIServiceService,
    private http: HttpClient,
    private parserService: TableParserService
  ) {
    this.http
      .get('assets/gpt/table.txt', { responseType: 'text' })
      .subscribe((e) => {
        this.question_tab1 = e;
      });
    this.http
      .get('assets/gpt/table2.txt', { responseType: 'text' })
      .subscribe((e) => {
        this.question_tab2 = e;
      });
    this.http
      .get('assets/gpt/header.txt', { responseType: 'text' })
      .subscribe((e) => {
        this.question_header = e;
      });
    this.http
      .get('assets/gpt/footer.txt', { responseType: 'text' })
      .subscribe((e) => {
        this.question_footer = e;
      });
    this.http
      .get('assets/gpt/header_footer.txt', { responseType: 'text' })
      .subscribe((e) => {
        this.question_header_footer = e;
      });
  }

  ngOnInit(): void {}

  getGPTResponse() {
    this.openaiService.getResponse(this.prompt).subscribe((data) => {
      this.response = data.choices[0].text;
    });
  }

  call(): void {
    const openai = new OpenAI({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });

    console.log('invio...attendo risposta da openai api');

    openai.chat.completions
      .create({
        messages: [
          {
            role: 'user',
            content:
              'given the following article: ' +
              this.prompt +
              ' - ' +
              this.question_tab2,
          },
        ],

        model: 'gpt-4',
      })
      .then((x) => {
        console.log('risposta ricevuta');
        this.response = x.choices[0].message.content;
        console.log(x);
        this.rows = this.parserService.parseTableText(this.response);
        console.log('righi', this.rows);
      });
  }
  call2(): void {
    const openai = new OpenAI({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });

    console.log('invio...attendo risposta da openai api');

    var q =
      'given the following article: ' +
      this.prompt +
      ' - ' +
      this.question_header_footer;

    openai.chat.completions
      .create({
        messages: [
          {
            role: 'user',
            content: q,
          },
        ],
        model: 'gpt-4',
      })
      .then((x) => {
        console.log('risposta ricevuta 2');
        this.response2 = x.choices[0].message.content;
        console.log(x);
        //this.rows = this.parserService.parseTableText(this.response);
        console.log('response2', this.response2);
      });
  }
}
