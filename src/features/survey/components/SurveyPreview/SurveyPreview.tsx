import { useState, type SubmitEvent } from 'react';
import { collectVisibleAnswers } from '../../lib/surveyTree';
import type { AnsweredQuestion, Answers, Question } from '../../types/survey';
import { QuestionPreview } from '../QuestionPreview/QuestionPreview';

type SurveyPreviewProps = {
  questions: Question[];
};

export const SurveyPreview = ({ questions }: SurveyPreviewProps) => {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<AnsweredQuestion[] | null>(null);

  const onAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setResult(null);
  };

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(collectVisibleAnswers(questions, answers));
  };

  if (questions.length === 0) {
    return <p>Add some questions in the Edit tab first.</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      {questions.map((question) => (
        <QuestionPreview
          key={question.id}
          question={question}
          answers={answers}
          onAnswer={onAnswer}
        />
      ))}

      <button type="submit">Submit</button>

      {result && (
        <pre className="survey-result">{JSON.stringify(result, null, 2)}</pre>
      )}
    </form>
  );
};
