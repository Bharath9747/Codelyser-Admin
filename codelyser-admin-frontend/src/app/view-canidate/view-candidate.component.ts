import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Candidate } from '../model/candidate.model';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrl: './view-candidate.component.scss',
})
export class ViewCandidateComponent implements OnInit {
  constructor(private httpService: HttpService, private router: Router) {}
  ngOnInit(): void {
    this.httpService.getCanidate().subscribe(
      (data) => {
        if (!data) alert('Create a Candidate First');
        else {
          this.dataSource = data;
          console.log(this.dataSource);
        }
      },
      (error) => {
        alert('Error in Getting Candidate Data');
      }
    );
  }
  displayedColumns: string[] = ['index', 'name', 'email', 'testName'];
  dataSource: Candidate[] = [];

  navigate(page: string) {
    this.router.navigate(['/' + page]);
  }
}
