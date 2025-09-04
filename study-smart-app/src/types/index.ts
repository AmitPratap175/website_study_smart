export interface Option {
  data_option: string;
  label: string;
  option_text: string;
  is_correct: boolean;
}

export interface Question {
  qid: string;
  passage_text: string;
  question_text: string;
  options: Option[];
  correct_option_data: string;
  solution_text: string | null;
  full_markdown: string;
}
