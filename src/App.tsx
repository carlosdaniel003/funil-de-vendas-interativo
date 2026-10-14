import { useCallback, useMemo, useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { recommendShip } from './features/recommendation/recommend';
import { useQuiz } from './features/quiz/useQuiz';
import { HomeScreen } from './screens/HomeScreen';
import { LeadScreen } from './screens/LeadScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultScreen } from './screens/ResultScreen';

type View = 'home' | 'quiz' | 'loading' | 'result';

export function App() {
  const [view, setView] = useState<View>('home');
  const [captainName, setCaptainName] = useState('');
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

  const finishLoading = useCallback(() => setView('result'), []);
  const progress = view === 'home' ? null : {
    step: quiz.stepIndex + 1,
    total: quiz.totalSteps,
    complete: quiz.isComplete,
    label: view === 'loading' ? 'ANALISANDO' : view === 'result' ? 'PRONTO' : quiz.isComplete ? 'QUASE LÁ' : undefined,
  };

  return (
    <div className="app-shell">
      <SiteHeader progress={progress} />
      <main className="main-content">
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
      <footer className="site-footer">
        Experimento de interface · Projeto fictício para estudo
      </footer>
    </div>
  );
}
