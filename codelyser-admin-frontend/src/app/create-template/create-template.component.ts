import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../model/template.model';
import { Question } from '../model/question.model';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.scss',
})
export class CreateTemplateComponent implements OnInit {
  questionId!: number;
  languages = ['Java', 'Cpp'];
  templates: Template[] = [];

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private httpService: HttpService
  ) {}
  ngOnInit(): void {
    this.questionId = this.router.snapshot.queryParams['questionId'];
    this.templates = this.languages.map((language) => ({
      code: '',
      language: language,
    }));
  }
  navigate(page: string) {
    this.route.navigate(['/' + page]);
  }
  onSubmit() {
    const question: Question = {
      id: this.questionId,
      templates: this.templates,
    };
    this.httpService.saveQuestion(question).subscribe(
      (data) => {
        alert(data['result']);
        this.navigate('view-question');
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
