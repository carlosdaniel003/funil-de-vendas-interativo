/**
 * Trilha e efeitos espaciais sintetizados localmente pela Web Audio API.
 * Sem arquivos externos, dependências ou requisições de rede.
 */
const BPM = 86;
const STEP = 60 / BPM / 2;
const STEPS_PER_BAR = 8;
const CHORDS = [
  { pad: [57, 60, 64], lead: [69, 72, 76, 81], bass: 45 },
  { pad: [53, 57, 60], lead: [65, 69, 72, 77], bass: 41 },
  { pad: [48, 52, 55], lead: [67, 72, 76, 79], bass: 36 },
  { pad: [55, 59, 62], lead: [67, 71, 74, 79], bass: 43 },
] as const;
const ARPEGGIO: readonly (number | null)[] = [0, null, 2, 1, null, 3, 2, null];

export type SoundEffect =
  | 'click' | 'select' | 'typing' | 'transition'
  | 'loading' | 'scan' | 'celebrate' | 'reveal'
  | 'error' | 'power';

const frequency = (note: number) => 440 * 2 ** ((note - 69) / 12);

export class SpaceMusicEngine {
  private context: AudioContext | null = null;
  private musicBus: GainNode | null = null;
  private effectsBus: GainNode | null = null;
  private scheduler: number | null = null;
  private step = 0;
  private nextStepTime = 0;
  private lastTypingTime = -1;
  private typingIndex = 0;

  start(): void {
    if (this.context) {
      this.resume();
      return;
    }

    const audioWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const AudioConstructor = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;
    if (!AudioConstructor) return;

    try {
      const context = new AudioConstructor();
      const master = context.createGain();
      master.gain.value = 0.68;
      master.connect(context.destination);

      const musicBus = context.createGain();
      musicBus.gain.value = 0.52;
      const filter = context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2500;
      musicBus.connect(filter);
      filter.connect(master);

      const effectsBus = context.createGain();
      effectsBus.gain.value = 0.72;
      effectsBus.connect(master);

      this.context = context;
      this.musicBus = musicBus;
      this.effectsBus = effectsBus;
      this.step = 0;
      this.nextStepTime = context.currentTime + 0.05;
      this.scheduler = window.setInterval(() => this.schedule(), 100);
      this.resume();
      this.schedule();
    } catch {
      this.stop();
    }
  }

  /** Executar diretamente no pointerdown/keydown para liberar áudio no celular. */
  resume(): void {
    const context = this.context;
    if (!context) {
      this.start();
      return;
    }
    if (context.state !== 'suspended') return;

    // Desbloqueio iOS: cria um oscilador silencioso dentro do próprio gesto.
    try {
      const starter = context.createOscillator();
      const gain = context.createGain();
      gain.gain.value = 0;
      starter.connect(gain);
      gain.connect(context.destination);
      starter.start();
      starter.stop(context.currentTime + 0.01);
      starter.onended = () => {
        starter.disconnect();
        gain.disconnect();
      };
    } catch {
      // Alguns navegadores não permitem iniciar um oscilador suspenso.
    }

    void context.resume().then(() => {
      // O agendamento começa imediatamente após a permissão ser liberada.
      if (this.context === context) {
        this.nextStepTime = context.currentTime + 0.025;
        this.schedule();
      }
    }).catch(() => {
      // O navegador ainda não autorizou reprodução audível.
    });
  }

  private note(
    midi: number,
    time: number,
    duration: number,
    volume: number,
    wave: OscillatorType,
    attack: number,
    release: number,
  ): void {
    const context = this.context;
    const bus = this.musicBus;
    if (!context || !bus) return;

    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const end = time + duration;
    const hold = Math.max(time + attack, end - release);
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency(midi), time);
    envelope.gain.setValueAtTime(0.0001, time);
    envelope.gain.linearRampToValueAtTime(volume, time + attack);
    envelope.gain.setValueAtTime(volume * 0.64, hold);
    envelope.gain.exponentialRampToValueAtTime(0.0001, end);
    oscillator.connect(envelope);
    envelope.connect(bus);
    oscillator.start(time);
    oscillator.stop(end + 0.02);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
  }

  private tone(
    startHz: number,
    endHz: number,
    at: number,
    duration: number,
    level: number,
    wave: OscillatorType = 'sine',
  ): void {
    const context = this.context;
    const bus = this.effectsBus;
    if (!context || !bus) return;

    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(startHz, at);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, endHz), at + duration);
    envelope.gain.setValueAtTime(0.0001, at);
    envelope.gain.linearRampToValueAtTime(level, at + Math.min(0.02, duration * 0.25));
    envelope.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    oscillator.connect(envelope);
    envelope.connect(bus);
    oscillator.start(at);
    oscillator.stop(at + duration + 0.01);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
  }

  playEffect(effect: SoundEffect): void {
    const context = this.context;
    if (!context) return;
    if (context.state === 'suspended') this.resume();
    const time = context.currentTime + 0.014;

    switch (effect) {
      case 'click':
        this.tone(680, 480, time, 0.085, 0.12);
        break;
      case 'select':
        this.tone(520, 770, time, 0.15, 0.15, 'triangle');
        this.tone(840, 1050, time + 0.075, 0.10, 0.075);
        break;
      case 'typing': {
        // Limita a densidade de bipes para não encobrir a música.
        if (time - this.lastTypingTime < 0.075) return;
        this.lastTypingTime = time;
        this.typingIndex = (this.typingIndex + 1) % 5;
        const pitch = 670 + this.typingIndex * 55;
        this.tone(pitch, pitch * 0.89, time, 0.034, 0.036, 'triangle');
        break;
      }
      case 'transition':
        this.tone(300, 650, time, 0.31, 0.11);
        this.tone(440, 810, time + 0.06, 0.26, 0.055);
        break;
      case 'loading':
        this.tone(210, 440, time, 0.38, 0.13);
        break;
      case 'scan':
        this.tone(480, 725, time, 0.13, 0.055);
        break;
      case 'celebrate':
        [523, 659, 784, 1046].forEach((hz, i) => {
          this.tone(hz, hz * 1.015, time + i * 0.14, 0.45, 0.13);
        });
        this.tone(523, 524, time + 0.56, 0.70, 0.07);
        this.tone(784, 785, time + 0.56, 0.70, 0.07);
        break;
      case 'reveal':
        this.tone(392, 523, time, 0.21, 0.08);
        this.tone(659, 880, time + 0.13, 0.38, 0.10);
        break;
      case 'error':
        this.tone(240, 170, time, 0.20, 0.13, 'triangle');
        break;
      case 'power':
        this.tone(470, 850, time, 0.22, 0.10);
        break;
    }
  }

  private scheduleStep(at: number): void {
    const bar = Math.floor(this.step / STEPS_PER_BAR) % CHORDS.length;
    const index = this.step % STEPS_PER_BAR;
    const chord = CHORDS[bar];
    if (!chord) return;
    if (index === 0) {
      for (const midi of chord.pad) {
        this.note(midi, at, STEP * 8.8, 0.054, 'sine', 0.45, 0.85);
      }
    }
    if (index === 0 || index === 4) {
      this.note(chord.bass, at, STEP * 3.6, 0.049, 'triangle', 0.09, 0.5);
    }
    const lead = ARPEGGIO[index];
    if (lead != null) {
      const midi = chord.lead[lead];
      if (midi !== undefined) this.note(midi, at, STEP * 1.65, 0.068, 'sine', 0.018, 0.43);
    }
    this.step = (this.step + 1) % (STEPS_PER_BAR * CHORDS.length);
  }

  private schedule(): void {
    const context = this.context;
    if (!context || context.state !== 'running') return;
    if (this.nextStepTime < context.currentTime - 0.2) {
      this.nextStepTime = context.currentTime + 0.035;
    }

    let count = 0;
    while (this.nextStepTime < context.currentTime + 0.42 && count < 4) {
      this.scheduleStep(this.nextStepTime);
      this.nextStepTime += STEP;
      count += 1;
    }
  }

  stop(): void {
    if (this.scheduler !== null) {
      window.clearInterval(this.scheduler);
      this.scheduler = null;
    }
    const context = this.context;
    this.context = null;
    this.musicBus = null;
    this.effectsBus = null;
    if (context && context.state !== 'closed') {
      void context.close().catch(() => {});
    }
  }
}
