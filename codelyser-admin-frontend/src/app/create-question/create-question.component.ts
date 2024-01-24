import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../model/question.model';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { languages, levels, types } from '../util/constants';
import { Template } from '../model/template.model';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss',
})
export class CreateQuestionComponent implements OnInit {
  myForm!: FormGroup;
  levels = levels;
  types = types;
  selectedValue!: string;
  selectedLanguages: string[] = [];
  languages!: string[];
  displayTextArea: { [key: string]: boolean } = {};
  templates: { [key: string]: string } = {};
  subscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      type: ['', Validators.required],
    });
  }
  OnChange() {
    if (this.myForm.value['type'] != 'Database') {
      this.languages = languages[this.myForm.value['type']];
      for (let index = 0; index < this.languages.length; index++) {
        const element = this.languages[index];
        this.displayTextArea[element] = false;
        this.templates[element] = '';
      }
    } else {
      this.languages = [];
      this.displayTextArea = {};
      this.templates = {};
    }
  }
  onSelect(language: string) {
    this.displayTextArea[language] = !this.displayTextArea[language];
  }
  onSubmit() {
    if (this.myForm.valid) {
      let filteredTemplate: Template[] = [];
      for (let obj in this.templates) {
        if (this.templates[obj] != '') {
          filteredTemplate.push({
            code: this.templates[obj],
            language: obj,
          });
        }
      }
      const question: Question = this.myForm.value as Question;
      question.templates = filteredTemplate;
      this.subscription = this.httpService.saveQuestion(question).subscribe({
        next: (data) => {
          alert(data['result']);
          this.router.navigate(['/' + 'view-question']);
        },
        error: (error) => {
          if (error['status'] === 400) alert(error['error']);
          else alert('Server not responding');
        },
      });
    } else {
      alert('Enter the Valid Data');
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
