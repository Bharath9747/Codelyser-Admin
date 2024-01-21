import { Candidate } from './candidate.model';

export interface Test {
  id?: number;
  title?: string;
  totalScore?: number;
  questionIds?: number[];
  candidates?: Candidate[];
}
