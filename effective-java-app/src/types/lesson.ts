// Matches the JSON schema output by the content-generation Claude Code skill.

export interface CodeSnippet {
  class: string;
  call_site: string;
}

export interface Flashcard {
  front: string;
  back: string;
  needs_review?: boolean;
  review_note?: string;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correct_index: 0 | 1 | 2 | 3;
}

export type InterviewQuestionType =
  | 'conceptual'
  | 'spot_the_issue'
  | 'gotcha'
  | 'applied'
  | 'other';

export interface InterviewQuestion {
  type: InterviewQuestionType;
  question: string;
  model_answer: string;
}

export interface Lesson {
  item_number: number; // 1-90
  title: string;
  concept: string;
  wrong_code: CodeSnippet;
  right_code: CodeSnippet;
  when_to_use_flashcard: Flashcard;
  when_not_to_use_flashcard: Flashcard;
  quiz: QuizQuestion[];
  interview_questions: InterviewQuestion[];
}
