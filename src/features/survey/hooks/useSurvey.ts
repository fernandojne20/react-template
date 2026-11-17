import { useState } from 'react';
import type { Question } from '../types/survey';
import {
  createOption,
  createQuestion,
  removeQuestion,
  updateOption,
  updateQuestion,
} from '../lib/surveyTree';

export const useSurvey = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const actions = {
    addQuestion: () => setQuestions((prev) => [...prev, createQuestion()]),

    updateQuestionText: (questionId: string, text: string) =>
      setQuestions((prev) =>
        updateQuestion(prev, questionId, (question) => ({ ...question, text })),
      ),

    removeQuestion: (questionId: string) =>
      setQuestions((prev) => removeQuestion(prev, questionId)),

    addOption: (questionId: string) =>
      setQuestions((prev) =>
        updateQuestion(prev, questionId, (question) => ({
          ...question,
          options: [...question.options, createOption()],
        })),
      ),

    updateOptionLabel: (questionId: string, optionId: string, label: string) =>
      setQuestions((prev) =>
        updateOption(prev, questionId, optionId, (option) => ({
          ...option,
          label,
        })),
      ),

    removeOption: (questionId: string, optionId: string) =>
      setQuestions((prev) =>
        updateQuestion(prev, questionId, (question) => ({
          ...question,
          options: question.options.filter((option) => option.id !== optionId),
        })),
      ),

    addFollowUp: (questionId: string, optionId: string) =>
      setQuestions((prev) =>
        updateOption(prev, questionId, optionId, (option) => ({
          ...option,
          followUps: [...option.followUps, createQuestion()],
        })),
      ),
  };

  return { questions, actions };
};

export type SurveyActions = ReturnType<typeof useSurvey>['actions'];
