import { useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { useQuiz } from './features/quiz/useQuiz';
import { HomeScreen } from './screens/HomeScreen';
import { QuizScreen } from './screens/QuizScreen';

type View = 'home' | 'quiz';

export function App() {
  const [view, setView] = useState<View>('home');
  const quiz = useQuiz();

  function start() {
    quiz.reset();
    setView('quiz');
  }

  function exit() {
    quiz.reset();
    setView('home');
  }

  return (
    <div className="app-shell">
      <SiteHeader progress={view === 'quiz' ? {
        step: quiz.stepIndex + 1,
        total: quiz.totalSteps,
        complete: quiz.isComplete,
      } : null} />
      <main className="main-content">
        {view === 'home' ? <HomeScreen onStart={start} /> : <QuizScreen quiz={quiz} onExit={exit} />}
      </main>
      <footer className="site-footer">
        Experimento de interface · Projeto fictício para estudo
      </footer>
    </div>
  );
}
