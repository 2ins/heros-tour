import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import * as Realm from 'realm-web';
import { Observable } from 'rxjs';
import { GetQualities } from 'src/app/actions/quality.action';
import { Article, TableItem, TransformedItem } from 'src/app/model/article';
import { Master } from 'src/app/model/master';
import { Quality } from 'src/app/model/quality';
import { SharedMongoArticleService } from 'src/app/services/shared-mongo-article.service';
import { HeroState } from 'src/app/states/todo.state';
import { ExperienceInsertOverviewComponent } from '../../entities/experience/experience-insert-overview/experience-insert-overview.component';

@Component({
  selector: 'app-mongo-article-detail',
  templateUrl: './mongo-article-detail.component.html',
  styleUrls: ['./mongo-article-detail.component.css'],
})
export class MongoArticleDetailComponent implements OnInit {
  @Select(HeroState.getQualityList) qualities?: Observable<Quality[]>;
  theQs: Quality[] = [];
  myQs: Quality[] = [];
  dialogConfig = new MatDialogConfig();
  master?: Master;

  constructor(
    public sharedMongoArticleService: SharedMongoArticleService,
    private store: Store,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.article = this.sharedMongoArticleService.getData();
  }

  update() {
    console.log('article', this.article);
    this.test();
  }

  addXp() {
    if (this.article?.table) {
      var items = this.transformTableItems(this.article?.table);
      this.myQs = this.getQualityArray(this.theQs, items);
    }
    console.log('PORCdduE+', this.article);
    if (this.article) {
      var uffa = this.article._id.toString();
      this.article.id = this.article._id.toString();
    }

    const appo = {
      oggetto: this.sharedMongoArticleService.getMaster(),
      preselected: this.myQs,
      article: this.article,
    };
    console.log('da passare:', appo);
    this.router.navigateByUrl('/addnew', { state: appo });
  }

  @Input()
  article?: Article;

  ngOnInit(): void {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.dialogConfig.panelClass = 'full-screen-modal';
    this.dialogConfig.maxHeight = '100vh';
    this.dialogConfig.maxWidth = '100vw';

    this.qualities?.subscribe((e) => {
      if (e.length == 0) {
        this.store.dispatch(new GetQualities());
      } else {
        this.theQs = e;
        console.log('le chiacchiere stanno a zero');
      }
    });
  }

  openSearchMaster() {
    this.dialogConfig.data = { type: 'addMongo' };
    const dialogRef = this.dialog.open(
      ExperienceInsertOverviewComponent,
      this.dialogConfig
    );
  }

  async test() {
    const app = new Realm.App({ id: 'application-0-wzcwq' });
    // const credentials = Realm.Credentials.anonymous();

    try {
      // Autentica l'utente
      const credentials = Realm.Credentials.emailPassword(
        'federico.frascarelli@gmail.com',
        'federico'
      );

      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user);
      // Qui puoi reindirizzare l'utente alla pagina principale o fare altre azioni post-login

      // Attendi i dati dalla funzione Realm
      if (this.article) {
        this.article.convertion = { converted: true };
        const data = await user.functions.callFunction(
          'updateDoc',
          this.article
        );
        console.log('what happend:', data);
      }
    } catch (err) {
      console.error('Failed :', err);
    }
  }

  transformTableItems(tableItems: TableItem[]): TransformedItem[] {
    const transformedArray: TransformedItem[] = [];
    console.log('tableItems', tableItems);
    tableItems.forEach((item) => {
      item.Seligman_Strengths.forEach((strength) => {
        const existingItem = transformedArray.find(
          (tItem) => tItem.seligman_strength === strength
        );

        if (existingItem) {
          existingItem.count++;
          existingItem.quality_description.push(item.Quality);
        } else {
          const newItem: TransformedItem = {
            seligman_strength: strength,
            count: 1,
            quality_description: [item.Quality],
          };
          transformedArray.push(newItem);
        }
      });
    });

    return transformedArray;
  }

  getQualityArray(
    qualities: Quality[],
    transformedArray: TransformedItem[]
  ): Quality[] {
    const updatedQualities: Quality[] = [];

    transformedArray.forEach((transformedItem) => {
      const matchingQuality = qualities.find(
        (quality) => quality.name === transformedItem.seligman_strength
      );

      if (matchingQuality) {
        const updatedQuality: Quality = {
          ...matchingQuality,
          desc_xp: transformedItem.quality_description.join(', '),
        };
        updatedQualities.push(updatedQuality);
      }
    });

    return updatedQualities;
  }
}
