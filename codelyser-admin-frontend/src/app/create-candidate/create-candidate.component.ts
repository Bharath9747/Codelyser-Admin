import { Component, OnInit } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Test } from '../model/test.model';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss',
})
export class CreateCandidateComponent implements OnInit {
  constructor(private httpService: HttpService, private route: Router) {}

  ngOnInit(): void {
    this.selectedTest = this.selectedTest as Test;
    this.httpService.getTest().subscribe(
      (data) => {
        this.tests = data;
        if (this.tests.length == 0) alert('Create a Test First');
      },
      (error) => {
        alert('Error in Getting Test Data');
      }
    );
  }
  navigate(page: string) {
    this.route.navigate(['/' + page]);
  }
  tests: Test[] = [];
  candidates: Candidate[] = [];
  score: number = 0;
  selectedTest: any;

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.httpService.uploadUser(file).subscribe(
        (response) => {
          if (response.length == 0) alert('Error in Uploading Data');
          else {
            alert('Data Uploaded');
            this.candidates = response;
          }
        },
        (error) => {
          alert('Error in Uploading Data');
        }
      );
    }
  }
  getScore() {
    this.score = this.selectedTest.totalScore;
  }
}
