import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDialogComponent } from './question-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

describe('QuestionDialogComponent', () => {
  let component: QuestionDialogComponent;
  let fixture: ComponentFixture<QuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      declarations: [QuestionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
