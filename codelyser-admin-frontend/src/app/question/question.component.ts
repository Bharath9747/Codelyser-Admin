import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  constructor(private route: Router) {}

  navigate(page: string) {
    this.route.navigate(['/' + page]);
  }
}
