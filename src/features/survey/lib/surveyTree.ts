import type {
  Answers,
  AnsweredQuestion,
  Option,
  Question,
} from '../types/survey';

export const createQuestion = (): Question => ({
  id: crypto.randomUUID(),
  text: '',
  options: [],
});

export const createOption = (): Option => ({
  id: crypto.randomUUID(),
  label: '',
  followUps: [],
});

// The only "deep update" in the app: finds the question by id at any depth
// and returns a new tree with `update` applied to it.
export const updateQuestion = (
  questions: Question[],
  questionId: string,
  update: (question: Question) => Question,
): Question[] =>
  questions.map((question) => {
    if (question.id === questionId) return update(question);

    return {
      ...question,
      options: question.options.map((option) => ({
        ...option,
        followUps: updateQuestion(option.followUps, questionId, update),
      })),
    };
  });

// Options always live inside a question, so updating one is just updating
// its owner question.
export const updateOption = (
  questions: Question[],
  questionId: string,
  optionId: string,
  update: (option: Option) => Option,
): Question[] =>
  updateQuestion(questions, questionId, (question) => ({
    ...question,
    options: question.options.map((option) =>
      option.id === optionId ? update(option) : option,
    ),
  }));

// Dropping a node drops its whole subtree, so the cascade delete comes free
// with the tree shape.
export const removeQuestion = (
  questions: Question[],
  questionId: string,
): Question[] =>
  questions
    .filter((question) => question.id !== questionId)
    .map((question) => ({
      ...question,
      options: question.options.map((option) => ({
        ...option,
        followUps: removeQuestion(option.followUps, questionId),
      })),
    }));

// Walks only the branches the respondent opened. Answers left behind in a
// branch that is now hidden never reach the result: derive, don't sync.
export const collectVisibleAnswers = (
  questions: Question[],
  answers: Answers,
): AnsweredQuestion[] =>
  questions.flatMap((question) => {
    const selected = question.options.find(
      (option) => option.id === answers[question.id],
    );
    if (!selected) return [];

    return [
      { questionId: question.id, question: question.text, answer: selected.label },
      ...collectVisibleAnswers(selected.followUps, answers),
    ];
  });
