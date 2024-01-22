import { Component, OnInit } from '@angular/core';
import { Test } from '../model/test.model';
import { HttpService } from '../service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.scss',
})
export class ViewTestComponent implements OnInit {
  constructor(private httpService: HttpService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.httpService.getTest().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        alert('Server not responding');
      }
    );
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
}
