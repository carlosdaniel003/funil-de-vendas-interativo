import type { QuizSession } from '../features/quiz/useQuiz';

interface QuizScreenProps {
  quiz: QuizSession;
  onExit: () => void;
}

export function QuizScreen({ quiz, onExit }: QuizScreenProps) {
  const { question } = quiz;
  if (!question) return null;

  const dialogueText = quiz.isReacting && quiz.selectedOption
    ? quiz.selectedOption.reaction
    : question.prompt;

  return (
    <section className="quiz-entry quiz-screen" aria-labelledby="quiz-title">
      <div className="dialogue-section">
        <div className="dialogue-symbol" aria-hidden="true">✦</div>
        <div className="dialogue-box">
          <span className="dialogue-speaker">COMANDANTE NOVA</span>
          <p aria-live="polite" aria-atomic="true">{dialogueText}<span className="dialogue-caret" aria-hidden="true" /></p>
        </div>
      </div>
      <div className="question-heading">
        <h1 id="quiz-title" key={question.id}>{question.title}</h1>
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
              onClick={() => quiz.selectOption(option.id)}
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
        {quiz.isReacting && <span className="advance-notice" role="status">RESPOSTA RECEBIDA...</span>}
      </div>
    </section>
  );
}
