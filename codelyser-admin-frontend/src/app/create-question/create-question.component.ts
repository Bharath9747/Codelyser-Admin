import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../model/question.model';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss',
})
export class CreateQuestionComponent implements OnInit {
  myForm!: FormGroup;
  levels: string[] = ['Easy', 'Medium', 'Hard'];
  selectedValue!: string;

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
      description: [''],
      level: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const question: Question = this.myForm.value as Question;

      this.httpService.saveQuestion(question).subscribe(
        (data) => {
          alert(data['result']);
          this.router.navigate(['/' + 'view-question']);
        },
        (error) => {
          console.error('Error', error);
        }
      );
    } else {
      alert('Enter the Valid Data');
    }
  }
}
