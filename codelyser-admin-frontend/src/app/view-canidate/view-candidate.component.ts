import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { Candidate } from '../model/candidate.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrl: './view-candidate.component.scss',
})
export class ViewCandidateComponent implements OnInit {
  subscription!: Subscription;
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  testLabels: string[] = [
    'Test Assigned',
    'Test Started',
    'Test Ended',
    'Test Score Not Calculated',
  ];
  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.subscription = this.httpService.getCanidate().subscribe({
      next: (data) => {
        if (!data) alert('Create a Candidate First');
        else {
          this.dataSource = data;
          for (let index = 0; index < this.dataSource.length; index++) {
            const element = this.dataSource[index];
            if (element.testResult == null)
              this.candidateStatus[index] = this.testLabels[0];
            else {
              if (element.testResult.status === 0)
                this.candidateStatus[index] = this.testLabels[1];
              if (element.testResult.status === 1)
                this.candidateStatus[index] = this.testLabels[2];
              if (element.testResult.status === -1)
                this.candidateStatus[index] = this.testLabels[3];
            }
          }
        }
      },
      error: (error) => {
        alert('Server not responding');
      },
    });
  }
  displayedColumns: string[] = [
    'index',
    'name',
    'email',
    'testName',
    'status',
    'action',
  ];
  dataSource: Candidate[] = [];
  candidateStatus: string[] = [];

  viewScore(candidate: Candidate) {
    console.log(candidate);
  }
}
