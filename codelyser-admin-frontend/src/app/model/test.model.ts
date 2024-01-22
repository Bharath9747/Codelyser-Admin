import { Candidate } from './candidate.model';
import { Question } from './question.model';

export interface Test {
  id?: number;
  title?: string;
  totalScore?: number;
  questions?: Question[];
  candidates?: Candidate[];
}
