import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateQuestionComponent } from './create-question/create-question.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { CreateTestComponent } from './create-test/create-test.component';

import { CreateTestcaseComponent } from './create-testcase/create-testcase.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { ViewTestComponent } from './view-test/view-test.component';
import { ViewCandidateComponent } from './view-canidate/view-candidate.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    path: 'create-test',
    component: CreateTestComponent,
  },
  {
    path: 'view-test',
    component: ViewTestComponent,
  },

  {
    path: 'create-candidate',
    component: CreateCandidateComponent,
  },
  {
    path: 'view-candidate',
    component: ViewCandidateComponent,
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
