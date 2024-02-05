import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { Master } from '../model/master';

@Injectable({
  providedIn: 'root',
})
export class SharedMongoArticleService {
  constructor() {}

  private articleData?: Article;
  private list: Article[] = [];
  private master?: Master;

  setData(art: Article) {
    this.articleData = art;
  }

  getData(): Article | undefined {
    return this.articleData;
  }

  setList(list: Article[]) {
    this.list = list;
  }

  getList(): Article[] {
    return this.list;
  }

  setMaster(master: Master | undefined) {
    this.master = master;
  }

  getMaster(): Master | undefined {
    return this.master;
  }
}
