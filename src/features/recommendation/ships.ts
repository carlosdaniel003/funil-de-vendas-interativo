/** Catálogo inteiramente fictício usado na demonstração. */
export const ships = [
  {
    id: 'swift',
    name: 'FALCÃO NEON',
    className: 'Interceptadora',
    tagline: 'Velocidade para chegar primeiro.',
    description: 'Uma nave ágil, projetada para deslocamentos rápidos, rotas curtas e manobras precisas.',
    features: ['Propulsão de alta aceleração', 'Controles de resposta rápida', 'Cabine compacta'],
  },
  {
    id: 'atlas',
    name: 'ATLAS HORIZON',
    className: 'Exploradora de longo alcance',
    tagline: 'Mais longe, sem perder o rumo.',
    description: 'Uma nave versátil, desenvolvida para jornadas longas, cargas e tripulações maiores.',
    features: ['Reserva ampliada de energia', 'Módulos para carga e equipe', 'Navegação interestelar'],
  },
  {
    id: 'aegis',
    name: 'BOREALIS AEGIS',
    className: 'Nave de suporte',
    tagline: 'Segurança em cada coordenada.',
    description: 'Uma estrutura resistente e confiável para resgates, missões de suporte e trajetos desafiadores.',
    features: ['Escudos reforçados', 'Módulo de atendimento', 'Redundância de sistemas'],
  },
  {
    id: 'discovery',
    name: 'ORION SPECTRA',
    className: 'Nave de pesquisa',
    tagline: 'Descubra o que ninguém viu.',
    description: 'Uma plataforma equipada com sensores e laboratórios para expedições científicas.',
    features: ['Laboratório integrado', 'Sensores de longo alcance', 'Mapeamento automatizado'],
  },
] as const;

export type Ship = (typeof ships)[number];
export type ShipId = Ship['id'];
