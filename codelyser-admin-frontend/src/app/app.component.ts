import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private route: Router) {}
  navigate(page: string) {
    this.route.navigate(['/' + page]);
  }
  opened = false;
}
