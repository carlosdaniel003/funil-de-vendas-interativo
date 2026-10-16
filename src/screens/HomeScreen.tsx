import { NovaPortrait } from '../components/NovaPortrait';
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
        <span><b aria-hidden="true">✦</b> 5 PERGUNTAS</span>
        <span><b aria-hidden="true">◷</b> MENOS DE 1 MINUTO</span>
      </div>

      <div className="rocket-stage">
        <div className="rocket-hud-caption" aria-hidden="true">
          <span>VECTOR SCANNER // NAV 07</span>
          <span>◉ SISTEMA OPERANTE</span>
        </div>
        <div className="stage-notation stage-notation--left">VECTOR<br />SCAN 07</div>
        <RocketIllustration />
        <div className="stage-notation stage-notation--right">◉ SISTEMA<br />OPERANTE</div>
      </div>

      <section className="nova-intro" aria-label="Mensagem da comandante Nova">
        <NovaPortrait variant="intro" alt="Nova, comandante virtual da missão" />
        <div className="nova-intro__message">
          <div className="nova-intro__heading">
            <strong>NOVA</strong>
            <span aria-hidden="true">CANAL 01 // ONLINE</span>
          </div>
          <p>
            Olá, comandante! Em cinco decisões, vou encontrar a nave ideal para a sua missão.
          </p>
          <div className="nova-intro__transmission" aria-hidden="true">
            <span>TRANSMISSÃO SEGURA</span>
            <span className="nova-intro__pips"><i /><i /><i /></span>
          </div>
        </div>
      </section>

      <div className="home-launch">
        <button className="primary-button" type="button" onClick={onStart}>
          <span aria-hidden="true">▶</span> COMEÇAR MISSÃO
        </button>
      </div>
      <p className="support-text">Uma demonstração de navegação inspirada em quizzes interativos.</p>
    </section>
  );
}
