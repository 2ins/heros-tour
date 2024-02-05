import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MongoApiService {
  private apiUrl =
    'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ldgvn/endpoint/data/v1/action/findOne';

  constructor(private http: HttpClient) {}

  findOne(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key':
        'm2UGqG0g5C2968vLPu99vI9An9Q6A4o3sdLCxfaz5TIS4u1T3uD602oK6MzxmZDo',
    });

    const requestBody = {
      collection: 'test',
      database: 'articles',
      dataSource: 'Cluster0',
    };

    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }
}
