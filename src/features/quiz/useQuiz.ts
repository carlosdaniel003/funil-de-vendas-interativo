import { useEffect, useState } from 'react';
import { questions, type QuizAnswers } from './questions';

/** Pausa curta para exibir a reação do personagem antes de avançar. */
const REACTION_DURATION_MS = 1100;

export function useQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [pendingOptionId, setPendingOptionId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[stepIndex];
  const selectedOptionId = question ? answers[question.id] ?? null : null;
  const selectedOption = question?.options.find((option) => option.id === selectedOptionId);

  useEffect(() => {
    if (pendingOptionId === null || isComplete) return;

    const timerId = window.setTimeout(() => {
      if (stepIndex === questions.length - 1) {
        setIsComplete(true);
      } else {
        setStepIndex((current) => current + 1);
      }
      setPendingOptionId(null);
    }, REACTION_DURATION_MS);

    // Navegar para trás ou reiniciar cancela o avanço automático pendente.
    return () => window.clearTimeout(timerId);
  }, [pendingOptionId, stepIndex, isComplete]);

  function selectOption(optionId: string) {
    if (!question || isComplete || pendingOptionId !== null) return;
    if (!question.options.some((option) => option.id === optionId)) return;

    setAnswers((current) => ({ ...current, [question.id]: optionId }));
    setPendingOptionId(optionId);
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
    goBack,
    reset,
  };
}

export type QuizSession = ReturnType<typeof useQuiz>;
