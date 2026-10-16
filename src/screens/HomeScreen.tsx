import { RocketIllustration } from '../components/RocketIllustration';

interface HomeScreenProps {
  onStart: () => void;
}

/** Abertura minimalista: mensagem, nave e uma unica acao. */
export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <section className="home-screen home-screen--minimal" aria-labelledby="home-title">
      <h1 id="home-title" className="hero-title">
        QUAL NAVE <span>COMBINA COM VOCÊ?</span>
      </h1>
      <p className="hero-description">
        Responda 5 perguntas e descubra sua nave.
      </p>

      <div className="rocket-stage">
        <RocketIllustration />
      </div>

      <div className="home-launch">
        <button className="primary-button" type="button" onClick={onStart}>
          <span aria-hidden="true">▶</span> COMEÇAR MISSÃO
        </button>
      </div>
    </section>
  );
}
