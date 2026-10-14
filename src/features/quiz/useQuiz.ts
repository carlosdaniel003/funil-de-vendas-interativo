import { useState } from 'react';
import { questions, type QuizAnswers } from './questions';

export function useQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [pendingOptionId, setPendingOptionId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[stepIndex];
  const selectedOptionId = question ? answers[question.id] ?? null : null;
  const selectedOption = question?.options.find((option) => option.id === selectedOptionId);

  function selectOption(optionId: string) {
    if (!question || isComplete || pendingOptionId !== null) return;
    if (!question.options.some((option) => option.id === optionId)) return;

    setAnswers((current) => ({ ...current, [question.id]: optionId }));
    setPendingOptionId(optionId);
  }

  /** Avança apenas depois que a digitação da reação terminar. */
  function completeReaction() {
    if (pendingOptionId === null || isComplete) return;

    if (stepIndex === questions.length - 1) {
      setIsComplete(true);
    } else {
      setStepIndex((current) => Math.min(current + 1, questions.length - 1));
    }
    setPendingOptionId(null);
  }

  function goBack() {
    setPendingOptionId(null);
    if (isComplete) {
      setIsComplete(false);
      return;
    }
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function reset() {
    setPendingOptionId(null);
    setStepIndex(0);
    setAnswers({});
    setIsComplete(false);
  }

  return {
    question,
    stepIndex,
    totalSteps: questions.length,
    answers,
    selectedOptionId,
    selectedOption,
    isReacting: pendingOptionId !== null,
    isComplete,
    selectOption,
    completeReaction,
    goBack,
    reset,
  };
}

export type QuizSession = ReturnType<typeof useQuiz>;
