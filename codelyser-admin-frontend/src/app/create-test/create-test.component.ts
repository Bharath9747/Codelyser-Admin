import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { Question } from '../model/question.model';
import { Test } from '../model/test.model';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.scss',
})
export class CreateTestComponent {
  constructor(private httpService: HttpService, private router: Router) {}
  questions: Question[] = [];
  questionIds: number[] = [];
  selectedQuestions: Question[] = [];
  title!: string;
  onSubmit() {
    if (this.questionIds.length === 0) {
      alert('Select atleast one question');
      return;
    }
    if (this.questionIds.length > 4) {
      alert('Select Question range 1 - 4');
      return;
    }
    for (let index = 0; index < this.questionIds.length; index++) {
      const element = this.questionIds[index];

      for (let i = 0; i < this.questions.length; i++) {
        let question = this.questions[i];
        if (question.id == element) this.selectedQuestions.push(question);
      }
    }
    let test = {
      title: this.title,
      totalScore: this.totalScore,
      questions: this.selectedQuestions,
    } as Test;

    this.httpService.saveTest(test).subscribe(
      (data) => {
        alert(data['result']);
        this.router.navigate(['/view-test']);
      },
      (error) => {
        if (error['status'] === 400) alert(error['error']);
        else alert('Server not responding');
      }
    );
  }

  ngOnInit(): void {
    this.httpService.getQuestion().subscribe(
      (data) => {
        this.questions = data
          .filter(
            (question) =>
              question.templates &&
              question.templates.length > 0 &&
              question.testcases &&
              question.testcases.length > 0
          )
          .map(({ id, title, description, score, level }) => ({
            id,
            title,
            description,
            score,
            level,
          }));
      },
      (error) => {
        alert('Server not responding');
      }
    );
  }
  totalScore = 0;

  updateTotalScore(id?: number, score?: number) {
    if (id && score) {
      let questionId = this.questionIds.find((i) => i == id);
      if (!questionId) {
        this.questionIds.push(id);
        this.totalScore += score;
      } else {
        this.questionIds = this.questionIds.filter((i) => i != id);
        this.totalScore -= score;
      }
    }
  }
}
