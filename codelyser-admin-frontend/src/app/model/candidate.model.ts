import { Test } from './test.model';
import { TestResult } from './testresult.model';

export interface Candidate {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  test?: Test;
  testResult?: TestResult;
}
