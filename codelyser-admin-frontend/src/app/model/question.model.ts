import { Template } from './template.model';
import { TestCase } from './testcase.model';

export interface Question {
  id?: number;
  title?: string;
  description?: string;
  level?: string;
  score?: number;
  templates?: Template[];
  testcases?: TestCase[];
}
