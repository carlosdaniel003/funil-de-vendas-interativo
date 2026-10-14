import { RocketIllustration } from '../components/RocketIllustration';

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <section className="home-screen" aria-labelledby="home-title">
      <div className="eyebrow">SIMULADOR INTERATIVO · EDIÇÃO DE ESTUDO</div>
      <h1 id="home-title" className="hero-title">QUAL NAVE <span>COMBINA COM VOCÊ?</span></h1>
      <p className="hero-description">
        Cinco decisões rápidas. No final, descubra qual nave fictícia foi feita para a sua missão.
      </p>
      <div className="hero-tags" aria-label="Características do simulador">
        <span>✧ 5 PERGUNTAS</span>
        <span>⌁ MENOS DE 1 MINUTO</span>
      </div>
      <div className="rocket-stage">
        <div className="stage-notation stage-notation--left">SETOR 07<br />COORD. 0042</div>
        <RocketIllustration />
        <div className="stage-notation stage-notation--right">SINAL<br />ESTÁVEL</div>
      </div>
      <button className="primary-button" type="button" onClick={onStart}>
        <span aria-hidden="true">▶</span> COMEÇAR MISSÃO
      </button>
      <p className="support-text">Uma demonstração de navegação inspirada em quizzes interativos.</p>
    </section>
  );
}
