import { useState } from 'react';
import { useSurvey } from '../../hooks/useSurvey';
import { QuestionEditor } from '../QuestionEditor/QuestionEditor';
import { SurveyPreview } from '../SurveyPreview/SurveyPreview';
import './SurveyBuilder.css';

type Mode = 'edit' | 'preview';

export const SurveyBuilder = () => {
  const { questions, actions } = useSurvey();
  const [mode, setMode] = useState<Mode>('edit');

  return (
    <section className="survey-builder">
      <h1>Survey Builder</h1>

      <div className="survey-row">
        <button
          type="button"
          aria-pressed={mode === 'edit'}
          onClick={() => setMode('edit')}
        >
          Edit
        </button>
        <button
          type="button"
          aria-pressed={mode === 'preview'}
          onClick={() => setMode('preview')}
        >
          Preview
        </button>
      </div>

      {mode === 'edit' ? (
        <>
          {questions.map((question) => (
            <QuestionEditor
              key={question.id}
              question={question}
              actions={actions}
            />
          ))}
          <button type="button" onClick={actions.addQuestion}>
            + Add question
          </button>
        </>
      ) : (
        <SurveyPreview questions={questions} />
      )}
    </section>
  );
};
