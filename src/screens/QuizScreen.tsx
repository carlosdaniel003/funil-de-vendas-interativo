import { useEffect } from 'react';
import { HudGlyph } from '../components/HudGlyph';
import { useSound } from '../features/audio/SoundProvider';
import { TypewriterText } from '../components/TypewriterText';
import type { QuizSession } from '../features/quiz/useQuiz';

interface QuizScreenProps {
  quiz: QuizSession;
  onExit: () => void;
}

export function QuizScreen({ quiz, onExit }: QuizScreenProps) {
  const { play } = useSound();
  const { question } = quiz;
  const questionId = question?.id;

  useEffect(() => {
    if (questionId) play('transition');
  }, [questionId, play]);
  if (!question) return null;

  const dialogueText = quiz.isReacting && quiz.selectedOption
    ? quiz.selectedOption.reaction
    : question.prompt;

  function handleOption(optionId: string) {
    if (quiz.isReacting) return;
    play('select');
    quiz.selectOption(optionId);
    // A fala está acima das alternativas; no celular deve permanecer visível.
    window.scrollTo(0, 0);
  }

  return (
    <section className="quiz-entry quiz-screen" aria-labelledby="quiz-title">
      <div className="quiz-scene" key={question.id}>
        <div className="dialogue-section">
          <div className="dialogue-symbol" aria-hidden="true"><HudGlyph /></div>
          <div className="dialogue-box">
            <span className="dialogue-speaker">NOVA</span>
            <p>
              <span aria-hidden={quiz.isReacting}>
                <TypewriterText
                  key={question.id + ':' + (quiz.selectedOptionId ?? 'prompt')}
                  text={dialogueText}
                  animated={quiz.isReacting}
                  onComplete={quiz.completeReaction}
                  onCharacter={(character) => {
                    if (/[a-zA-ZÀ-ÿ0-9]/.test(character)) play('typing');
                  }}
                />
              </span>
              <span className={'dialogue-caret' + (quiz.isReacting ? ' dialogue-caret--typing' : '')} aria-hidden="true" />
            </p>
            <span className="sr-only" role="status" aria-live="polite">{quiz.isReacting ? dialogueText : ''}</span>
          </div>
        </div>
        <div className="arcade-sector-row" aria-hidden="true">
          <span>SEQUÊNCIA // {String(quiz.stepIndex + 1).padStart(2, '0')}</span>
          <span>SCAN 0{quiz.totalSteps} · {quiz.isReacting ? 'DECODIFICANDO' : 'AGUARDANDO COMANDO'}</span>
        </div>
        <div className="question-heading">
          <h1 id="quiz-title">{question.title}</h1>
          <span className="question-index">{String(quiz.stepIndex + 1).padStart(2, '0')} / {String(quiz.totalSteps).padStart(2, '0')}</span>
        </div>
        <div className="option-list" aria-label={'Respostas: ' + question.title}>
          {question.options.map((option) => {
            const selected = quiz.selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                className={'option-card' + (selected ? ' option-card--selected' : '')}
                aria-pressed={selected}
                disabled={quiz.isReacting}
                onClick={() => handleOption(option.id)}
              >
                <span className="option-indicator" aria-hidden="true">{selected ? '◆' : '◇'}</span>
                <span className="option-content">
                  <strong>{option.title}</strong>
                  {option.description && <span className="option-description">{option.description}</span>}
                </span>
                <span className="option-arrow" aria-hidden="true">→</span>
              </button>
            );
          })}
        </div>
        <div className="quiz-bottom-actions">
          <button className="back-button" type="button" onClick={quiz.stepIndex === 0 ? onExit : quiz.goBack}>
            ◀ {quiz.stepIndex === 0 ? 'VOLTAR AO INÍCIO' : 'VOLTAR'}
          </button>
          {quiz.isReacting && <span className="advance-notice" role="status">NOVA RESPONDENDO...</span>}
        </div>
      </div>
    </section>
  );
}
