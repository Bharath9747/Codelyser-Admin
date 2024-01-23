import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../model/question.model';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { levels, types } from '../util/constants';

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

  onSubmit() {
    if (this.myForm.valid) {
      const question: Question = this.myForm.value as Question;

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
