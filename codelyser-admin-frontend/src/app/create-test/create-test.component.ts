import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { Question } from '../model/question.model';
import { Test } from '../model/test.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.scss',
})
export class CreateTestComponent {
  constructor(private httpService: HttpService, private router: Router) {}
  questions: Question[] = [];
  selectedQuestions: Question[] = [];
  subscriptions: Subscription[] = [];
  title!: string;

  onSubmit() {
    if (this.selectedQuestions.length === 0) {
      alert('Select atleast one question');
      return;
    }
    if (this.selectedQuestions.length > 4) {
      alert('Select Question range 1 - 4');
      return;
    }

    let test = {
      title: this.title,
      totalScore: this.totalScore,
      questions: this.selectedQuestions,
    } as Test;

    this.subscriptions.push(
      this.httpService.saveTest(test).subscribe({
        next: (data) => {
          alert(data['result']);
          this.router.navigate(['/view-test']);
        },
        error: (error) => {
          if (error['status'] === 400) alert(error['error']);
          else alert('Server not responding');
        },
      })
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.httpService.getQuestion().subscribe({
        next: (data) => {
          this.questions = data
            .filter(
              (question) => question.testcases && question.testcases.length > 0
            )
            .map(({ id, title, description, score, level }) => ({
              id,
              title,
              description,
              score,
              level,
            }));
        },
        error: (error) => {
          alert('Server not responding');
        },
      })
    );
  }
  totalScore = 0;

  updateTotalScore(index: number) {
    let question = this.questions[index];
    let questionAlready = this.selectedQuestions.filter((x) => x == question);

    if (questionAlready.length == 1) {
      if (question.score != undefined) {
        this.selectedQuestions = this.selectedQuestions.filter(
          (x) => x != question
        );
        this.totalScore -= question.score;
      }
    } else {
      if (question.score != undefined) {
        this.totalScore += question.score;
        this.selectedQuestions.push(question);
      }
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
