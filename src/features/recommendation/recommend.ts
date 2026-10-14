import { questions, type QuizAnswers, type QuizQuestionId } from '../quiz/questions';
import { ships, type Ship, type ShipId } from './ships';

/** Garante que todas as alternativas existentes tenham uma regra definida. */
type PreferenceMatrix = {
  [Q in (typeof questions)[number] as Q['id']]: Record<
    Q['options'][number]['id'],
    readonly [ShipId, ShipId, ShipId]
  >;
};

/** Cada escolha distribui pontos para três naves distintas por afinidade. */
const preferences = {
  mission: {
    explore: ['aurora', 'atlas', 'onyx'],
    rescue: ['vortex', 'aurora', 'solaris'],
    cargo: ['atlas', 'solaris', 'aurora'],
    research: ['nebulon', 'onyx', 'solaris'],
  },
  destination: {
    asteroids: ['vortex', 'aurora', 'onyx'],
    nebula: ['onyx', 'nebulon', 'aurora'],
    frontier: ['atlas', 'aurora', 'solaris'],
    orbit: ['solaris', 'vortex', 'nebulon'],
  },
  priority: {
    speed: ['vortex', 'aurora', 'onyx'],
    range: ['atlas', 'solaris', 'aurora'],
    shield: ['solaris', 'nebulon', 'atlas'],
    technology: ['onyx', 'nebulon', 'solaris'],
  },
  crew: {
    solo: ['onyx', 'vortex', 'aurora'],
    duo: ['aurora', 'vortex', 'nebulon'],
    team: ['nebulon', 'solaris', 'atlas'],
    fleet: ['atlas', 'solaris', 'aurora'],
  },
  departure: {
    today: ['vortex', 'aurora', 'atlas'],
    week: ['aurora', 'solaris', 'vortex'],
    month: ['solaris', 'atlas', 'nebulon'],
    researching: ['onyx', 'nebulon', 'solaris'],
  },
} as const satisfies PreferenceMatrix;

const weights: Record<QuizQuestionId, number> = {
  mission: 4,
  destination: 3,
  priority: 5,
  crew: 4,
  departure: 2,
};

export interface Recommendation {
  ship: Ship;
  reasons: readonly string[];
  scores: Readonly<Record<ShipId, number>>;
}

/** Estável: as mesmas cinco respostas sempre geram a mesma recomendação. */
export function recommendShip(answers: QuizAnswers): Recommendation | null {
  const scores = Object.fromEntries(
    ships.map((ship) => [ship.id, 0]),
  ) as Record<ShipId, number>;

  for (const question of questions) {
    const selectedId = answers[question.id];
    if (!selectedId || !question.options.some((option) => option.id === selectedId)) {
      return null;
    }

    // A validação acima impede que respostas desconhecidas gerem pontuações.
    const ranked = (preferences[question.id] as Record<string, readonly ShipId[]>)[selectedId];
    if (!ranked || ranked.length !== 3) return null;

    ranked.forEach((shipId, rank) => {
      const points = rank === 0
        ? weights[question.id]
        : rank === 1 ? Math.max(1, weights[question.id] - 2) : 1;
      scores[shipId] += points;
    });
  }

  // A ordem estável do catálogo desempata sem sorteio.
  const bestShip = ships.reduce<Ship>(
    (best, candidate) => scores[candidate.id] > scores[best.id] ? candidate : best,
    ships[0],
  );

  const mission = questions[0].options.find((o) => o.id === answers.mission);
  const priority = questions[2].options.find((o) => o.id === answers.priority);
  const reasons = [
    bestShip.reason,
    mission ? 'Seu tipo de missão: ' + mission.title.toLowerCase() + '.' : '',
    priority ? 'Sua prioridade: ' + priority.title.toLowerCase() + '.' : '',
  ].filter(Boolean);

  return { ship: bestShip, reasons, scores };
}
