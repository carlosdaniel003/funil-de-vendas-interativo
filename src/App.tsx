import { useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { HomeScreen } from './screens/HomeScreen';
import { QuizEntryScreen } from './screens/QuizEntryScreen';

type View = 'home' | 'quiz';

export function App() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="app-shell">
      <SiteHeader showProgress={view === 'quiz'} />
      <main className="main-content">
        {view === 'home' ? (
          <HomeScreen onStart={() => setView('quiz')} />
        ) : (
          <QuizEntryScreen onBack={() => setView('home')} />
        )}
      </main>
      <footer className="site-footer">
        Experimento de interface · Projeto fictício para estudo
      </footer>
    </div>
  );
}
