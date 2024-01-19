import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from '../model/question.model';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss',
})
export class QuestionDialogComponent implements OnInit {
  question!: Question;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Question,
    private matDialogRef: MatDialogRef<QuestionDialogComponent>
  ) {}
  onClose(): void {
    this.matDialogRef.close();
  }
  ngOnInit(): void {
    this.question = this.data;
  }
}
