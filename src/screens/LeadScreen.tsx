import { useState, type FormEvent } from 'react';
import { NovaPortrait } from '../components/NovaPortrait';
import { useSound } from '../features/audio/SoundProvider';

interface LeadScreenProps {
  onSubmit: (displayName: string) => void;
  onBack: () => void;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? '(' + digits : '';
  const area = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) return '(' + area + ') ' + rest;
  const split = rest.length > 8 ? 5 : 4;
  return '(' + area + ') ' + rest.slice(0, split) + '-' + rest.slice(split);
}

export function LeadScreen({ onSubmit, onBack }: LeadScreenProps) {
  const { play } = useSound();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim().replace(/\s+/g, ' ');
    const digits = phone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      play('error');
      setError('Informe um nome com pelo menos 2 caracteres.');
      return;
    }
    if (digits.length !== 10 && digits.length !== 11) {
      play('error');
      setError('Informe um telefone de demonstração com DDD e 10 ou 11 dígitos.');
      return;
    }

    setError('');
    // O telefone é validado e descartado; nenhum dado é enviado ou persistido.
    onSubmit(trimmedName.split(' ')[0] ?? trimmedName);
  }

  return (
    <section className="quiz-entry lead-screen" aria-labelledby="lead-title">
      <div className="dialogue-section">
        <div className="dialogue-symbol"><NovaPortrait variant="dialogue" alt="" /></div>
        <div className="dialogue-box">
          <span className="dialogue-speaker">NOVA</span>
          <p>Já tenho suas coordenadas! Só preciso identificar o capitão para liberar a recomendação.</p>
        </div>
      </div>
      <div className="arcade-sector-row" aria-hidden="true">
        <span>PROTOCOLO // IDENTIFICAÇÃO</span><span>01 · CAPITÃO</span>
      </div>
      <span className="completion-marker">QUASE LÁ · ÚLTIMA TRANSMISSÃO</span>
      <h1 id="lead-title" className="stage-title">IDENTIFIQUE-SE</h1>
      <form className="lead-form" onSubmit={submit} noValidate>
        <label htmlFor="captain-name">NOME DO CAPITÃO</label>
        <input
          id="captain-name"
          name="captain"
          type="text"
          autoComplete="off"
          maxLength={60}
          value={name}
          onChange={(event) => { setName(event.target.value); setError(''); }}
          placeholder="Como podemos chamar você?"
          required
        />
        <label htmlFor="captain-phone">COMUNICADOR (TELEFONE FICTÍCIO)</label>
        <input
          id="captain-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          value={phone}
          onChange={(event) => { setPhone(formatPhone(event.target.value)); setError(''); }}
          placeholder="(92) 90000-0000"
          maxLength={16}
          required
        />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="primary-button">▶ REVELAR MINHA NAVE</button>
      </form>
      <p className="privacy-note">Simulação local: use dados fictícios. Nada é enviado, armazenado ou compartilhado. O telefone é descartado ao continuar.</p>
      <div className="quiz-bottom-actions">
        <button type="button" className="back-button" onClick={onBack}>◀ ALTERAR ÚLTIMA RESPOSTA</button>
      </div>
    </section>
  );
}
