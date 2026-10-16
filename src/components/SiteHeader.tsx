import { NovaPortrait } from './NovaPortrait';

interface SiteHeaderProps {
  progress: { step: number; total: number; complete: boolean; label?: string } | null;
}

export function SiteHeader({ progress }: SiteHeaderProps) {
  const percentage = progress
    ? progress.complete ? 100 : Math.round((progress.step / progress.total) * 100)
    : 0;

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="host-information">
          <NovaPortrait variant="header" alt="Retrato ilustrado da Nova" />
          <span className="host-copy">
            <strong>NOVA</strong>
            <span className="host-role">COMANDANTE DE MISSÃO</span>
          </span>
        </div>
        <div className="header-progress">
          <span>{progress ? progress.label ?? (progress.complete ? 'CONCLUÍDO' : 'FASE ' + progress.step + '/' + progress.total) : 'PRONTO?'}</span>
          <span className="progress-track" role="progressbar" aria-label="Progresso do questionário" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
            <span className="progress-fill" style={{ width: percentage + '%' }} />
          </span>
        </div>
      </div>
    </header>
  );
}
