import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { ArcadeBackdrop } from './components/ArcadeBackdrop';
import { MusicToggle } from './components/MusicToggle';
import { CelebrationScreen } from './screens/CelebrationScreen';
import { recommendShip } from './features/recommendation/recommend';
import { useQuiz } from './features/quiz/useQuiz';
import { HomeScreen } from './screens/HomeScreen';
import { LeadScreen } from './screens/LeadScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultScreen } from './screens/ResultScreen';

type View = 'home' | 'quiz' | 'loading' | 'celebration' | 'result';

export function App() {
  const [view, setView] = useState<View>('home');
  const [captainName, setCaptainName] = useState('');
  const mainRef = useRef<HTMLElement>(null);
  const quiz = useQuiz();

  const recommendation = useMemo(
    () => quiz.isComplete ? recommendShip(quiz.answers) : null,
    [quiz.isComplete, quiz.answers],
  );

  function reset(to: View) {
    quiz.reset();
    setCaptainName('');
    setView(to);
  }

  function submitLead(displayName: string) {
    if (!recommendation) return;
    setCaptainName(displayName);
    setView('loading');
  }

  const finishLoading = useCallback(() => setView('celebration'), []);
  const finishCelebration = useCallback(() => setView('result'), []);

  // Reposiciona a página e o foco ao entrar em outra fase, inclusive no celular.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [view, quiz.stepIndex, quiz.isComplete]);
  const progress = view === 'home' ? null : {
    step: quiz.stepIndex + 1,
    total: quiz.totalSteps,
    complete: quiz.isComplete,
    label: view === 'loading' ? 'ANALISANDO' : view === 'celebration' ? 'ENCONTRADA' : view === 'result' ? 'PRONTO' : quiz.isComplete ? 'QUASE LÁ' : undefined,
  };

  return (
    <div className="app-shell">
      <ArcadeBackdrop />
      <SiteHeader progress={progress} />
      <main className="main-content" ref={mainRef} tabIndex={-1}>
        {view === 'home' && <HomeScreen onStart={() => reset('quiz')} />}
        {view === 'quiz' && !quiz.isComplete && <QuizScreen quiz={quiz} onExit={() => reset('home')} />}
        {view === 'quiz' && quiz.isComplete && recommendation && (
          <LeadScreen onBack={quiz.goBack} onSubmit={submitLead} />
        )}
        {view === 'quiz' && quiz.isComplete && !recommendation && (
          <section className="quiz-entry">
            <h1>RESPOSTAS INCOMPLETAS</h1>
            <p>Não foi possível validar todas as coordenadas.</p>
            <button type="button" className="secondary-button" onClick={() => reset('quiz')}>REINICIAR</button>
          </section>
        )}
        {view === 'loading' && <LoadingScreen onFinish={finishLoading} />}
        {view === 'celebration' && <CelebrationScreen onFinish={finishCelebration} />}
        {view === 'result' && recommendation && (
          <ResultScreen
            name={captainName}
            recommendation={recommendation}
            answers={quiz.answers}
            onRestart={() => reset('quiz')}
            onHome={() => reset('home')}
          />
        )}
      </main>
      <MusicToggle />
      <footer className="site-footer">
        Desenvolvido por Carlos Daniel - Experimento de Interface
      </footer>
    </div>
  );
}
