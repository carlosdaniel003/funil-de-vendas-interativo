interface SiteHeaderProps {
  progress: { step: number; total: number; complete: boolean } | null;
}

export function SiteHeader({ progress }: SiteHeaderProps) {
  const percentage = progress
    ? progress.complete ? 100 : Math.round((progress.step / progress.total) * 100)
    : 0;

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="host-information">
          <span aria-hidden="true" className="host-avatar">✦</span>
          <span className="host-copy">
            <strong>COMANDANTE NOVA</strong>
            <span className="host-status"><span className="status-dot" /> Transmissão ativa</span>
          </span>
        </div>
        <div className="header-progress">
          <span>{progress ? progress.complete ? 'CONCLUÍDO' : 'FASE ' + progress.step + '/' + progress.total : 'PRONTO?'}</span>
          <span className="progress-track" role="progressbar" aria-label="Progresso do questionário" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
            <span className="progress-fill" style={{ width: percentage + '%' }} />
          </span>
        </div>
      </div>
    </header>
  );
}
