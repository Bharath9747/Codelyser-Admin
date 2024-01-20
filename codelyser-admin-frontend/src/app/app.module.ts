import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AssignTestComponent } from './assign-test/assign-test.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { QuestionComponent } from './question/question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { CreateTestcaseComponent } from './create-testcase/create-testcase.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { ViewTestComponent } from './view-test/view-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateQuestionComponent,
    NotFoundComponent,
    CreateUserComponent,
    CreateTestComponent,
    AssignTestComponent,
    QuestionComponent,
    ViewQuestionComponent,
    CreateTestcaseComponent,
    CreateTemplateComponent,
    QuestionDialogComponent,
    ViewTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
