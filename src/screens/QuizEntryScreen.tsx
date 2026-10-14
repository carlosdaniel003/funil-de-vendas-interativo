interface QuizEntryScreenProps {
  onBack: () => void;
}

export function QuizEntryScreen({ onBack }: QuizEntryScreenProps) {
  return (
    <section className="quiz-entry" aria-labelledby="quiz-title">
      <div className="dialogue-section">
        <div className="dialogue-symbol" aria-hidden="true">✦</div>
        <div className="dialogue-box">
          <span className="dialogue-speaker">COMANDANTE NOVA</span>
          <p>Tripulante identificado. Vamos descobrir qual nave combina com o seu perfil.</p>
          <span className="dialogue-caret" aria-hidden="true" />
        </div>
      </div>
      <h2 id="quiz-title">SUA MISSÃO COMEÇA AQUI</h2>
      <p className="quiz-entry-description">
        Estrutura de navegação preparada. As cinco perguntas, as respostas contextualizadas e a barra de progresso serão implementadas na etapa 2.
      </p>
      <button type="button" className="secondary-button" onClick={onBack}>◀ VOLTAR AO INÍCIO</button>
    </section>
  );
}
