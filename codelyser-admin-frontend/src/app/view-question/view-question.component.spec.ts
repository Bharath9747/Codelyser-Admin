import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionComponent } from './view-question.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

describe('ViewQuestionComponent', () => {
  let component: ViewQuestionComponent;
  let fixture: ComponentFixture<ViewQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatTableModule, MatDialogModule],
      declarations: [ViewQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
