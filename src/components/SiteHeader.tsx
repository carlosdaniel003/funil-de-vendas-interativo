interface SiteHeaderProps {
  showProgress: boolean;
}

export function SiteHeader({ showProgress }: SiteHeaderProps) {
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
        <div className="header-progress" aria-label={showProgress ? 'Introdução do questionário' : 'Aguardando início'}>
          <span>{showProgress ? 'INÍCIO' : 'PRONTO?'}</span>
          <span className="progress-track"><span className={showProgress ? 'progress-fill progress-fill--active' : 'progress-fill'} /></span>
        </div>
      </div>
    </header>
  );
}
