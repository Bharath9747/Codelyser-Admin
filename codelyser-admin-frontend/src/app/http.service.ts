import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from './model/question.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:8080/question';

  constructor(private http: HttpClient) {}
  saveQuestion(question: Question): Observable<{ [key: string]: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.post<{ [key: string]: string }>(
      `${this.apiUrl}/save`,
      question,
      options
    );
  }
  getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/all`);
  }
}
