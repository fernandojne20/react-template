// The survey is a tree: a question owns its options, and each option owns
// the follow-up questions that appear only when that option is selected.
export type Option = {
  id: string;
  label: string;
  followUps: Question[];
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

// questionId -> selected optionId
export type Answers = Record<string, string>;

export type AnsweredQuestion = {
  questionId: string;
  question: string;
  answer: string;
};
