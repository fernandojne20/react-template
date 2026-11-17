import type { Answers, Question } from '../../types/survey';

type QuestionPreviewProps = {
  question: Question;
  answers: Answers;
  onAnswer: (questionId: string, optionId: string) => void;
};

// Recursive: only the follow-ups of the selected option are rendered.
export const QuestionPreview = ({
  question,
  answers,
  onAnswer,
}: QuestionPreviewProps) => {
  const selectedOption = question.options.find(
    (option) => option.id === answers[question.id],
  );

  return (
    <fieldset className="question-preview">
      <legend>{question.text || 'Untitled question'}</legend>

      {question.options.map((option) => (
        <label key={option.id}>
          <input
            type="radio"
            name={question.id}
            checked={selectedOption?.id === option.id}
            onChange={() => onAnswer(question.id, option.id)}
          />
          {option.label || 'Untitled option'}
        </label>
      ))}

      {selectedOption?.followUps.map((followUp) => (
        <QuestionPreview
          key={followUp.id}
          question={followUp}
          answers={answers}
          onAnswer={onAnswer}
        />
      ))}
    </fieldset>
  );
};
