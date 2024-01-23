import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../model/template.model';
import { Question } from '../model/question.model';
import { HttpService } from '../service/http.service';
import { languages } from '../util/constants';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.scss',
})
export class CreateTemplateComponent implements OnInit {
  questionId!: number;
  questionTitle!: string;
  languages = languages;
  templates: Template[] = [];

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private httpService: HttpService
  ) {}
  ngOnInit(): void {
    this.questionId = this.router.snapshot.queryParams['questionId'];
    this.questionTitle = this.router.snapshot.queryParams['questionTitle'];
    this.templates = this.languages.map((language) => ({
      code: '',
      language: language,
    }));
  }
  onSubmit() {
    const filteredTemplates = this.templates.filter(
      (template) => template.code?.trim() !== ''
    );
    if (filteredTemplates.length === 0) {
      alert('Atleast one Template needed to save the question');
      return;
    }
    const question: Question = {
      id: this.questionId,
      templates: filteredTemplates,
    };
    this.httpService.saveQuestion(question).subscribe(
      (data) => {
        alert(data['result']);
        this.route.navigate(['/' + 'view-question']);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
