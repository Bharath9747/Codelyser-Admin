import { Component, OnInit } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { Test } from '../model/test.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss',
})
export class CreateCandidateComponent implements OnInit {
  constructor(private httpService: HttpService, private route: Router) {}
  subscriptions: Subscription[] = [];
  assign() {
    if (this.selectedTest == undefined) {
      alert('Select a Test and Click the Get Button');
      return;
    }
    if (this.candidates.length == 0) {
      alert('Upload the Candidate Details First');
      return;
    }
    this.selectedTest.candidates = this.candidates;
    this.subscriptions.push(
      this.httpService.assignTest(this.selectedTest).subscribe({
        next: (data) => {
          alert(data['result']);
          this.route.navigate(['/view-candidate']);
        },
        error: (error) => {
          if (error['status'] === 404 || error['status'] === 400)
            alert(error['error']);
          else alert('Server not responding');
        },
      })
    );
  }
  ngOnInit(): void {
    this.selectedTest = this.selectedTest as Test;
    this.subscriptions.push(
      this.httpService.getTest().subscribe({
        next: (data) => {
          this.tests = data;
          if (this.tests.length == 0) alert('Create a Test First');
        },
        error: (error) => {
          alert('Server not responding');
        },
      })
    );
  }

  tests: Test[] = [];
  candidates: Candidate[] = [];
  questions: string = '';
  selectedTest: any;

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.subscriptions.push(
        this.httpService.uploadUser(file).subscribe({
          next: (response) => {
            if (response.length == 0) alert('There is no candidate details');
            else {
              alert('Data Uploaded');
              this.candidates = response;
            }
          },
          error: (error) => {
            if (error['status'] == 400) alert(error['error']);
            else alert('Server not responding');
          },
        })
      );
    }
  }
  getScore() {
    for (let index = 0; index < this.selectedTest.questions.length; index++) {
      this.questions += this.selectedTest.questions[index]['title'] + ' , ';
    }

    this.questions += this.selectedTest['totalScore'];
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
