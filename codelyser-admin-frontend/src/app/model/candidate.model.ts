import { Test } from './test.model';

export interface Candidate {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  test?: Test;
}
