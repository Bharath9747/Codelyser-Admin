import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Candidate } from '../model/candidate.model';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrl: './view-candidate.component.scss',
})
export class ViewCandidateComponent {
  constructor(private httpService: HttpService, private router: Router) {}
  displayedColumns: string[] = ['index', 'name', 'email', 'testName'];
  dataSource: Candidate[] = [];

  navigate(page: string) {
    this.router.navigate(['/' + page]);
  }
}
