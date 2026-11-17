import type { SurveyActions } from '../../hooks/useSurvey';
import type { Question } from '../../types/survey';

type QuestionEditorProps = {
  question: Question;
  actions: SurveyActions;
};

// Recursive: every option renders its follow-ups with this same component.
export const QuestionEditor = ({ question, actions }: QuestionEditorProps) => {
  return (
    <div className="question-editor">
      <div className="survey-row">
        <input
          type="text"
          aria-label="Question text"
          placeholder="Question text"
          value={question.text}
          onChange={(event) =>
            actions.updateQuestionText(question.id, event.target.value)
          }
        />
        <button type="button" onClick={() => actions.removeQuestion(question.id)}>
          Delete question
        </button>
      </div>

      <ul className="question-editor__options">
        {question.options.map((option) => (
          <li key={option.id}>
            <div className="survey-row">
              <input
                type="text"
                aria-label="Option label"
                placeholder="Option label"
                value={option.label}
                onChange={(event) =>
                  actions.updateOptionLabel(
                    question.id,
                    option.id,
                    event.target.value,
                  )
                }
              />
              <button
                type="button"
                onClick={() => actions.addFollowUp(question.id, option.id)}
              >
                + Follow-up
              </button>
              <button
                type="button"
                onClick={() => actions.removeOption(question.id, option.id)}
              >
                Delete option
              </button>
            </div>

            {option.followUps.length > 0 && (
              <div className="question-editor__follow-ups">
                <small>If "{option.label || 'this option'}" is selected:</small>
                {option.followUps.map((followUp) => (
                  <QuestionEditor
                    key={followUp.id}
                    question={followUp}
                    actions={actions}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => actions.addOption(question.id)}>
        + Add option
      </button>
    </div>
  );
};
