import { Component, Inject, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent implements OnInit {
  displayedColumns: string[] = ['index', 'title', 'score', 'level', 'actions'];
  dataSource: Question[] = [];

  constructor(
    private httpService: HttpService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.httpService.getQuestion().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        alert('Error in Getting Question');
      }
    );
  }

  navigate(questionId: number, page: string) {
    if (questionId)
      this.router.navigate(['/' + page], {
        queryParams: { questionId: questionId },
      });
    else this.router.navigate(['/' + page]);
  }
  openDialog(question: Question) {
    this.dialog.open(QuestionDialogComponent, {
      data: question,
      width: '600px',
      height: '500px',
    });
  }
}
