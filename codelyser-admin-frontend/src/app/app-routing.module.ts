import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateQuestionComponent } from './create-question/create-question.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AssignTestComponent } from './assign-test/assign-test.component';
import { QuestionComponent } from './question/question.component';
import { CreateTestcaseComponent } from './create-testcase/create-testcase.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { ViewTestComponent } from './view-test/view-test.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'question',
    component: QuestionComponent,
  },
  {
    path: 'create-question',
    component: CreateQuestionComponent,
  },
  {
    path: 'create-testcase',
    component: CreateTestcaseComponent,
  },
  {
    path: 'create-template',
    component: CreateTemplateComponent,
  },
  {
    path: 'view-question',
    component: ViewQuestionComponent,
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: 'create-test',
    component: CreateTestComponent,
  },
  {
    path: 'view-test',
    component: ViewTestComponent,
  },
  {
    path: 'assign-test',
    component: AssignTestComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
