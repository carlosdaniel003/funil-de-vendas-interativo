import { questions, type QuizAnswers, type QuizQuestionId } from '../quiz/questions';
import { ships, type Ship, type ShipId } from './ships';

/**
 * Cada resposta indica uma nave prioritária e uma alternativa.
 * As regras ficam separadas da UI e usam desempate estável pela ordem do catálogo.
 */
const preferences: Record<QuizQuestionId, Record<string, readonly ShipId[]>> = {
  mission: {
    explore: ['atlas', 'discovery'],
    rescue: ['aegis', 'swift'],
    cargo: ['atlas', 'aegis'],
    research: ['discovery', 'atlas'],
  },
  destination: {
    asteroids: ['swift', 'aegis'],
    nebula: ['discovery', 'atlas'],
    frontier: ['atlas', 'discovery'],
    orbit: ['swift', 'aegis'],
  },
  priority: {
    speed: ['swift', 'atlas'],
    range: ['atlas', 'discovery'],
    shield: ['aegis', 'atlas'],
    technology: ['discovery', 'swift'],
  },
  crew: {
    solo: ['swift', 'discovery'],
    duo: ['swift', 'aegis'],
    team: ['discovery', 'atlas'],
    fleet: ['atlas', 'aegis'],
  },
  departure: {
    today: ['swift', 'aegis'],
    week: ['aegis', 'swift'],
    month: ['atlas', 'discovery'],
    researching: ['discovery', 'atlas'],
  },
};

const weights: Record<QuizQuestionId, number> = {
  mission: 3,
  destination: 2,
  priority: 4,
  crew: 4,
  departure: 1,
};

export interface Recommendation {
  ship: Ship;
  reasons: readonly string[];
  scores: Readonly<Record<ShipId, number>>;
}

/** Resultados iguais para respostas iguais, independentemente de navegador ou horário. */
export function recommendShip(answers: QuizAnswers): Recommendation | null {
  const scores: Record<ShipId, number> = { swift: 0, atlas: 0, aegis: 0, discovery: 0 };

  for (const question of questions) {
    const selectedId = answers[question.id];
    if (!selectedId || !question.options.some((option) => option.id === selectedId)) {
      return null;
    }

    const preferredShips = preferences[question.id][selectedId];
    if (!preferredShips) return null;

    preferredShips.forEach((shipId, rank) => {
      scores[shipId] += rank === 0 ? weights[question.id] : 1;
    });
  }

  const bestShip = ships.reduce<Ship>(
    (best, candidate) => scores[candidate.id] > scores[best.id] ? candidate : best,
    ships[0],
  );

  const mission = questions[0].options.find((option) => option.id === answers.mission);
  const priority = questions[2].options.find((option) => option.id === answers.priority);
  const reasons = [
    mission ? 'Missão escolhida: ' + mission.title.toLowerCase() + '.' : '',
    priority ? 'Sua prioridade: ' + priority.title.toLowerCase() + '.' : '',
    'Essas respostas, junto com rota, tripulação e prazo, determinaram a maior pontuação.',
  ].filter(Boolean);

  return { ship: bestShip, reasons, scores };
}
