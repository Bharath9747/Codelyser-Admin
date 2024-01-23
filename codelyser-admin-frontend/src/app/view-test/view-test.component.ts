import { Component, OnInit } from '@angular/core';
import { Test } from '../model/test.model';
import { HttpService } from '../service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.scss',
})
export class ViewTestComponent implements OnInit {
  subscription!: Subscription;
  constructor(private httpService: HttpService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.subscription = this.httpService.getTest().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        alert('Server not responding');
      },
    });
  }
  displayedColumns: string[] = ['index', 'title', 'score', 'action'];
  dataSource: Test[] = [];
  openDialog(test: Test) {
    this.dialog.open(TestDialogComponent, {
      data: test,
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
