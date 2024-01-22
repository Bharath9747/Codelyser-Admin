import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from '../model/question.model';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { Test } from '../model/test.model';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrl: './test-dialog.component.scss',
})
export class TestDialogComponent {
  test!: Test;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Test,
    private matDialogRef: MatDialogRef<QuestionDialogComponent>
  ) {}
  onClose(): void {
    this.matDialogRef.close();
  }
  ngOnInit(): void {
    this.test = this.data;
  }
}
