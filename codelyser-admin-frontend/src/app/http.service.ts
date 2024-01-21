import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from './model/question.model';
import { Test } from './model/test.model';
import { Candidate } from './model/candidate.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiQuestion = 'http://localhost:8080/question';
  private apiTest = 'http://localhost:8080/test';
  private apiCandidate = 'http://localhost:8080/candidate';

  constructor(private http: HttpClient) {}
  uploadUser(file: File): Observable<Candidate[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Candidate[]>(`${this.apiCandidate}/upload`, formData);
  }
  saveQuestion(question: Question): Observable<{ [key: string]: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.post<{ [key: string]: string }>(
      `${this.apiQuestion}/save`,
      question,
      options
    );
  }
  getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiQuestion}/all`);
  }
  saveTest(test: Test): Observable<{ [key: string]: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.post<{ [key: string]: string }>(
      `${this.apiTest}/save`,
      test,
      options
    );
  }
  getTest(): Observable<Test[]> {
    return this.http.get<Question[]>(`${this.apiTest}/all`);
  }
  assignTest(test: Test): Observable<{ [key: string]: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.post<{ [key: string]: string }>(
      `${this.apiCandidate}/assign`,
      test,
      options
    );
  }
}
