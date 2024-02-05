import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIServiceService {
  private apiURL = 'https://api.openai.com/v1/engines/gpt-4/completions';

  constructor(private http: HttpClient) {}

  getResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer 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`, // Sostituisci con la tua chiave API
    });

    const body = {
      prompt: prompt,
      max_tokens: 50,
    };

    return this.http.post(this.apiURL, body, { headers: headers });
  }
}
