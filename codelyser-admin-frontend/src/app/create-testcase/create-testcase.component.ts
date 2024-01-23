import { Component } from '@angular/core';
import { HttpService } from '../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestCase } from '../model/testcase.model';
import { Question } from '../model/question.model';

@Component({
  selector: 'app-create-testcase',
  templateUrl: './create-testcase.component.html',
  styleUrl: './create-testcase.component.scss',
})
export class CreateTestcaseComponent {
  questionTitle!: string;
  testCaseCount: number = 1;
  questionId!: number;
  testCases: TestCase[] = [];
  constructor(
    private httpService: HttpService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.questionId = this.router.snapshot.queryParams['questionId'];
    this.questionTitle = this.router.snapshot.queryParams['questionTitle'];

    this.generateTestCases();
  }
  generateTestCases() {
    this.testCases = Array(this.testCaseCount).fill({ input: '', output: '' });
  }

  onSubmit() {
    if (this.testCaseCount === 0) {
      alert('Atleast 1 Testcase needed to save the question');
      return;
    }
    const question: Question = {
      id: this.questionId,
      testcases: this.testCases,
    };

    this.httpService.saveQuestion(question).subscribe(
      (data) => {
        alert(data['result']);
        this.route.navigate(['/view-question']);
      },
      (error) => {
        alert('Error in Saving Testcases');
      }
    );
  }
}
