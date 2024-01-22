import { Component, OnInit } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { Test } from '../model/test.model';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss',
})
export class CreateCandidateComponent implements OnInit {
  constructor(private httpService: HttpService, private route: Router) {}
  assign() {
    if (this.score == undefined) {
      alert('Select a Test and Click the Get Button');
      return;
    }
    if(this.candidates.length==0)
    {
      alert('Upload the Candidate Details First');
      return;
    }
    this.selectedTest.candidates = this.candidates;
    this.httpService.assignTest(this.selectedTest).subscribe(
      (data) => {
        alert(data['result']);
        this.route.navigate(['/view-candidate']);
      },
      (error) => {
        if (error['status'] === 400) alert(error['error']);
        else alert('Server not responding');
      }
    );
  }
  ngOnInit(): void {
    this.selectedTest = this.selectedTest as Test;
    this.httpService.getTest().subscribe(
      (data) => {
        this.tests = data;
        if (this.tests.length == 0) alert('Create a Test First');
      },
      (error) => {
        alert('Server not responding');
      }
    );
  }

  tests: Test[] = [];
  candidates: Candidate[] = [];
  score!: number;
  selectedTest: any;

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.httpService.uploadUser(file).subscribe(
        (response) => {
          if (response.length == 0) alert('There is no candidate details');
          else {
            alert('Data Uploaded');
            this.candidates = response;
          }
        },
        (error) => {
          if (error['status'] == 400) alert(error['error']);
          else alert('Server not responding');
        }
      );
    }
  }
  getScore() {
    this.score = this.selectedTest.totalScore;
  }
}
