import { useEffect, useState, type CSSProperties } from 'react';
import { HudGlyph } from '../components/HudGlyph';
import { useSound } from '../features/audio/SoundProvider';
import { ShipIllustration } from '../components/ShipIllustration';
import { questions, type QuizAnswers } from '../features/quiz/questions';
import type { Recommendation } from '../features/recommendation/recommend';

interface ResultScreenProps {
  name: string;
  recommendation: Recommendation;
  answers: QuizAnswers;
  onRestart: () => void;
  onHome: () => void;
}

function createSummary(name: string, recommendation: Recommendation, answers: QuizAnswers): string {
  const rows = questions.map((question) => {
    const answer = question.options.find((option) => option.id === answers[question.id]);
    return question.title + ': ' + (answer?.title ?? 'Não informado');
  });
  return [
    'QUIZ GALÁCTICO — SIMULAÇÃO',
    'Capitão: ' + name,
    'Nave recomendada: ' + recommendation.ship.name,
    recommendation.ship.description,
    '',
    ...rows,
    '',
    'Projeto demonstrativo, sem oferta comercial.',
  ].join('\n');
}

export function ResultScreen({ name, recommendation, answers, onRestart, onHome }: ResultScreenProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const ship = recommendation.ship;
  const { play } = useSound();

  useEffect(() => {
    play('reveal');
  }, [play]);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(createSummary(name, recommendation, answers));
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
  }

  return (
    <section
      className="quiz-entry result-screen"
      aria-labelledby="result-title"
      style={{ '--ship-accent': ship.accent, '--ship-shade': ship.shade } as CSSProperties}
    >
      <div className="dialogue-section">
        <div className="dialogue-symbol" aria-hidden="true"><HudGlyph /></div>
        <div className="dialogue-box">
          <span className="dialogue-speaker">NOVA</span>
          <p>Missão analisada, {name}! Encontrei uma nave compatível com as suas coordenadas.</p>
        </div>
      </div>
      <article className="result-card">
        <div className="result-ribbon">RECOMENDADA PARA SUA MISSÃO</div>
        <div className="result-art">
          <span className="result-art__label" aria-hidden="true">HOLOGRAMA // {ship.id.toUpperCase()}</span>
          <ShipIllustration shipId={ship.id} name={ship.name} />
          <span className="result-art__status" aria-hidden="true">MODELO CONFIRMADO · 100%</span>
        </div>
        <span className="result-category">{ship.className}</span>
        <h1 id="result-title">{ship.name}</h1>
        <p className="result-tagline">{ship.tagline}</p>
        <p className="result-description">{ship.description}</p>
        <h2>RECURSOS DESTA NAVE</h2>
        <ul className="feature-list">
          {ship.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      </article>
      <section className="recommendation-reasons" aria-label="Motivos da recomendação">
        <h2>POR QUE ESSA NAVE?</h2>
        <ul>{recommendation.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
      </section>
      <section className="answers-summary" aria-label="Resumo do seu pedido">
        <h2 className="summary-heading">SUAS COORDENADAS</h2>
        {questions.map((question, index) => (
          <div className="answer-summary-row" key={question.id}>
            <span className="answer-index">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <span className="answer-question">{question.title}</span>
              <strong>{question.options.find((option) => option.id === answers[question.id])?.title ?? 'Não respondida'}</strong>
            </span>
          </div>
        ))}
      </section>
      <button type="button" className="primary-button" onClick={copyReport}>
        ▸ COPIAR RELATÓRIO DA MISSÃO
      </button>
      <p className="copy-status" role="status">
        {copyStatus === 'success' ? 'Relatório copiado.' : copyStatus === 'error' ? 'Não foi possível copiar automaticamente neste navegador.' : 'Apenas demonstração. Nenhuma informação é enviada.'}
      </p>
      <button type="button" className="secondary-button restart-button" onClick={onRestart}>REFAZER O TESTE</button>
      <div className="quiz-bottom-actions"><button className="back-button" type="button" onClick={onHome}>◀ VOLTAR AO INÍCIO</button></div>
    </section>
  );
}
