/**
 * Trilha espacial original sintetizada pelo navegador, sem áudio externo.
 * A melodia e os acordes se repetem enquanto a experiência está aberta.
 */
const TEMPO = 86;
const STEP_DURATION = 60 / TEMPO / 2;
const STEPS_PER_BAR = 8;
const SCHEDULE_AHEAD_SECONDS = 0.42;
const SCHEDULER_INTERVAL_MS = 110;

interface Chord {
  pad: readonly number[];
  arpeggio: readonly number[];
  bass: number;
}

// Progressão Am - F - C - G, em notas MIDI.
const CHORDS: readonly Chord[] = [
  { pad: [57, 60, 64], arpeggio: [69, 72, 76, 81], bass: 45 },
  { pad: [53, 57, 60], arpeggio: [65, 69, 72, 77], bass: 41 },
  { pad: [48, 52, 55], arpeggio: [67, 72, 76, 79], bass: 36 },
  { pad: [55, 59, 62], arpeggio: [67, 71, 74, 79], bass: 43 },
];
const ARPEGGIO_PATTERN: readonly (number | null)[] = [0, null, 2, 1, null, 3, 2, null];

function midiToFrequency(note: number): number {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export class SpaceMusicEngine {
  private context: AudioContext | null = null;
  private output: GainNode | null = null;
  private scheduler: number | null = null;
  private step = 0;
  private nextStepTime = 0;

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
      this.context = context;

      const master = context.createGain();
      master.gain.value = 0.35;
      const lowPass = context.createBiquadFilter();
      lowPass.type = 'lowpass';
      lowPass.frequency.value = 2600;
      lowPass.Q.value = 0.5;
      master.connect(lowPass);
      lowPass.connect(context.destination);
      this.output = master;

      this.step = 0;
      this.nextStepTime = context.currentTime + 0.08;
      this.scheduler = window.setInterval(() => this.schedule(), SCHEDULER_INTERVAL_MS);
      // Tentativa inicial: em muitos celulares a reprodução só é liberada com um gesto.
      this.resume();
    } catch {
      this.stop();
    }
  }

  /** Chamado também durante a primeira interação, para desbloquear áudio no celular. */
  resume(): void {
    if (!this.context) {
      this.start();
      return;
    }
    if (this.context.state !== 'suspended') return;
    void this.context.resume().catch(() => {
      // A política de autoplay pode exigir uma interação do visitante.
    });
  }

  private playNote(
    midi: number,
    time: number,
    duration: number,
    volume: number,
    type: OscillatorType,
    attack: number,
    release: number,
  ): void {
    const context = this.context;
    const output = this.output;
    if (!context || !output) return;

    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const end = time + duration;
    const hold = Math.max(time + attack, end - release);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(midiToFrequency(midi), time);
    envelope.gain.setValueAtTime(0.0001, time);
    envelope.gain.linearRampToValueAtTime(volume, time + attack);
    envelope.gain.setValueAtTime(volume * 0.66, hold);
    envelope.gain.exponentialRampToValueAtTime(0.0001, end);

    oscillator.connect(envelope);
    envelope.connect(output);
    oscillator.start(time);
    oscillator.stop(end + 0.02);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
  }

  private scheduleStep(time: number): void {
    const bar = Math.floor(this.step / STEPS_PER_BAR) % CHORDS.length;
    const position = this.step % STEPS_PER_BAR;
    const chord = CHORDS[bar];
    if (!chord) return;

    if (position === 0) {
      // Pads longos para um fundo contínuo, com sobreposição entre acordes.
      for (const note of chord.pad) {
        this.playNote(note, time, STEP_DURATION * 8.8, 0.043, 'sine', 0.5, 0.85);
      }
    }
    if (position === 0 || position === 4) {
      this.playNote(chord.bass, time, STEP_DURATION * 3.6, 0.045, 'triangle', 0.09, 0.55);
    }

    const arpeggioIndex = ARPEGGIO_PATTERN[position];
    if (arpeggioIndex !== null && arpeggioIndex !== undefined) {
      const note = chord.arpeggio[arpeggioIndex];
      if (note !== undefined) {
        this.playNote(note, time, STEP_DURATION * 1.65, 0.062, 'sine', 0.018, 0.46);
      }
    }

    this.step = (this.step + 1) % (STEPS_PER_BAR * CHORDS.length);
  }

  private schedule(): void {
    const context = this.context;
    if (!context || context.state !== 'running') return;

    // Não empilha várias notas atrasadas após o aplicativo voltar do background.
    if (this.nextStepTime < context.currentTime - 0.2) {
      this.nextStepTime = context.currentTime + 0.05;
    }

    let scheduled = 0;
    while (this.nextStepTime < context.currentTime + SCHEDULE_AHEAD_SECONDS && scheduled < 4) {
      this.scheduleStep(this.nextStepTime);
      this.nextStepTime += STEP_DURATION;
      scheduled += 1;
    }
  }

  stop(): void {
    if (this.scheduler !== null) {
      window.clearInterval(this.scheduler);
      this.scheduler = null;
    }

    const context = this.context;
    const output = this.output;
    this.context = null;
    this.output = null;
    if (!context || context.state === 'closed') return;

    if (context.state === 'running' && output) {
      const now = context.currentTime;
      output.gain.cancelScheduledValues(now);
      output.gain.setValueAtTime(output.gain.value, now);
      output.gain.linearRampToValueAtTime(0, now + 0.12);
      window.setTimeout(() => {
        void context.close().catch(() => {});
      }, 160);
    } else {
      void context.close().catch(() => {});
    }
  }
}
