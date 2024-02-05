import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import { Article } from 'src/app/model/article';
import { SharedMongoArticleService } from 'src/app/services/shared-mongo-article.service';

@Component({
  selector: 'app-mongo-test',
  templateUrl: './mongo-test.component.html',
  styleUrls: ['./mongo-test.component.css'],
})
export class MongoTestComponent implements OnInit {
  onRowClicked(art: Article) {
    this.sharedMongoArticleService.setData(art);
    this.route.navigateByUrl('/mongoArticleDetail');
  }
  articoli: Article[] = [];
  displayedColumns: string[] = ['activity', 'master', 'place'];

  constructor(
    private sharedMongoArticleService: SharedMongoArticleService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.articoli = this.sharedMongoArticleService.getList();
    if (this.articoli?.length == 0) this.test();
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
      const data = await user.functions.callFunction('getDocs');
      console.log('Data received:', data);

      // Aggiorna i dati della tabella
      this.articoli = data;
      this.sharedMongoArticleService.setList(data);

      console.log(user);
    } catch (err) {
      console.error('Failed :', err);
    }
  }
}
