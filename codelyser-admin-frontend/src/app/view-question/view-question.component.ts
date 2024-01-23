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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent implements OnInit {
  displayedColumns: string[] = ['index', 'title', 'type', 'level', 'actions'];
  dataSource: Question[] = [];
  subscription!: Subscription;
  constructor(
    private httpService: HttpService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.subscription = this.httpService.getQuestion().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        alert('Server not responding');
      },
    });
  }

  navigate(question: any, page: string) {
    if (question) {
      question = question as Question;
      this.router.navigate(['/' + page], {
        queryParams: {
          id: question.id,
          title: question.title,
          type: question.type,
        },
      });
    } else this.router.navigate(['/' + page]);
  }
  openDialog(question: Question) {
    this.dialog.open(QuestionDialogComponent, {
      data: question,
      width: '600px',
      height: '500px',
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
