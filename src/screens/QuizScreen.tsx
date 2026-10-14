import { questions } from '../features/quiz/questions';
import type { QuizSession } from '../features/quiz/useQuiz';

interface QuizScreenProps {
  quiz: QuizSession;
  onExit: () => void;
}

export function QuizScreen({ quiz, onExit }: QuizScreenProps) {
  if (quiz.isComplete) {
    return (
      <section className="quiz-entry quiz-complete" aria-labelledby="complete-title">
        <div className="dialogue-section">
          <div className="dialogue-symbol" aria-hidden="true">✦</div>
          <div className="dialogue-box">
            <span className="dialogue-speaker">COMANDANTE NOVA</span>
            <p>Coordenadas recebidas! Seu perfil de missão foi mapeado.</p>
          </div>
        </div>
        <div className="completion-marker">TRANSMISSÃO CONCLUÍDA · 5/5</div>
        <h1 id="complete-title">MISSÃO REGISTRADA</h1>
        <p className="quiz-entry-description">
          Você completou as cinco perguntas. A demonstração termina aqui nesta etapa; o resultado personalizado será desenvolvido na etapa 3.
        </p>
        <div className="answers-summary" aria-label="Resumo das suas escolhas">
          {questions.map((question, index) => (
            <div className="answer-summary-row" key={question.id}>
              <span className="answer-index">{String(index + 1).padStart(2, '0')}</span>
              <span>
                <span className="answer-question">{question.title}</span>
                <strong>{question.options.find((option) => option.id === quiz.answers[question.id])?.title ?? 'Não respondida'}</strong>
              </span>
            </div>
          ))}
        </div>
        <button className="primary-button" type="button" onClick={quiz.reset}>REFAZER O QUIZ</button>
        <div className="quiz-bottom-actions">
          <button className="back-button" type="button" onClick={quiz.goBack}>◀ REVISAR ÚLTIMA RESPOSTA</button>
          <button className="back-button" type="button" onClick={onExit}>VOLTAR AO INÍCIO</button>
        </div>
      </section>
    );
  }

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
