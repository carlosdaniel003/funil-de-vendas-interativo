/** Conteúdo fictício, isolado da lógica e da interface do questionário. */
export interface QuizOption {
  id: string;
  title: string;
  description?: string;
  reaction: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  prompt: string;
  options: readonly QuizOption[];
}

export const questions = [
  {
    id: 'mission',
    title: 'QUAL É A SUA MISSÃO?',
    prompt: 'Tripulante, primeira coordenada: que tipo de missão você prefere?',
    options: [
      { id: 'explore', title: 'Explorar novos mundos', description: 'O desconhecido está chamando', reaction: 'Espírito explorador detectado! Vamos procurar uma rota fora dos mapas.' },
      { id: 'rescue', title: 'Resgatar tripulações', description: 'Cada segundo faz diferença', reaction: 'Missão de resgate registrada. Precisaremos de agilidade e confiança.' },
      { id: 'cargo', title: 'Transportar cargas', description: 'Longas rotas entre planetas', reaction: 'Carga confirmada! Uma nave resistente vai fazer toda a diferença.' },
      { id: 'research', title: 'Pesquisar o universo', description: 'Ciência, sensores e descobertas', reaction: 'Sinal científico recebido. Vamos priorizar instrumentos de exploração.' },
    ],
  },
  {
    id: 'destination',
    title: 'POR ONDE VOCÊ VAI VIAJAR?',
    prompt: 'Entendido! Agora me diga em qual região do espaço você costuma operar.',
    options: [
      { id: 'asteroids', title: 'Campos de asteroides', description: 'Manobras em espaços apertados', reaction: 'Obstáculos por todos os lados! Controle de manobra será essencial.' },
      { id: 'nebula', title: 'Nebulosas distantes', description: 'Viagens por regiões misteriosas', reaction: 'Nebulosas? Gostei do desafio. Precisaremos de bons sensores.' },
      { id: 'frontier', title: 'Fronteiras desconhecidas', description: 'Destinos longe de qualquer base', reaction: 'Rota de longo alcance confirmada. Autonomia entrou na lista.' },
      { id: 'orbit', title: 'Órbita de planetas', description: 'Trajetos frequentes e controlados', reaction: 'Órbitas registradas. Uma nave prática pode ser uma ótima companheira.' },
    ],
  },
  {
    id: 'priority',
    title: 'O QUE NÃO PODE FALTAR?',
    prompt: 'Hora de ajustar os sistemas. Qual recurso é indispensável para você?',
    options: [
      { id: 'speed', title: 'Velocidade máxima', description: 'Chegar antes de todo mundo', reaction: 'Propulsores no máximo! Velocidade será nossa prioridade.' },
      { id: 'range', title: 'Grande autonomia', description: 'Viajar sem paradas constantes', reaction: 'Tanques preparados para longas jornadas. Autonomia anotada.' },
      { id: 'shield', title: 'Proteção reforçada', description: 'Blindagem para viagens seguras', reaction: 'Escudos carregados! Segurança em primeiro lugar.' },
      { id: 'technology', title: 'Tecnologia avançada', description: 'Sensores e automação de ponta', reaction: 'Sistemas inteligentes ativados. Boa escolha para missões complexas.' },
    ],
  },
  {
    id: 'crew',
    title: 'QUANTOS VÃO A BORDO?',
    prompt: 'Estamos quase lá. Qual será o tamanho da sua tripulação?',
    options: [
      { id: 'solo', title: 'Só eu', description: 'Uma missão independente', reaction: 'Capitão solo! A cabine pode ser compacta e eficiente.' },
      { id: 'duo', title: 'Duas pessoas', description: 'Uma dupla pronta para tudo', reaction: 'Dupla registrada. Dois assentos e aventura garantida.' },
      { id: 'team', title: 'De 3 a 5 pessoas', description: 'Uma equipe completa', reaction: 'Equipe a bordo! Vamos considerar espaço e conforto.' },
      { id: 'fleet', title: 'Mais de 5 pessoas', description: 'Tripulação de grande porte', reaction: 'Tripulação numerosa! Precisaremos pensar grande.' },
    ],
  },
  {
    id: 'departure',
    title: 'QUANDO COMEÇA A MISSÃO?',
    prompt: 'Última coordenada, prometo. Quando pretende decolar?',
    options: [
      { id: 'today', title: 'Hoje mesmo', description: 'Pronto para partir agora', reaction: 'Contagem regressiva iniciada! Sua rota está quase pronta.' },
      { id: 'week', title: 'Nesta semana', description: 'Só faltam os últimos preparativos', reaction: 'Excelente! Tempo suficiente para revisar os sistemas.' },
      { id: 'month', title: 'Neste mês', description: 'Ainda organizando a viagem', reaction: 'Plano de voo em preparação. Vamos deixar tudo organizado.' },
      { id: 'researching', title: 'Ainda estou pesquisando', description: 'Quero conhecer as possibilidades', reaction: 'Sem pressa, explorador. Primeiro vamos mapear as opções.' },
    ],
  },
] as const satisfies readonly QuizQuestion[];

export type QuizQuestionId = (typeof questions)[number]['id'];
export type QuizAnswers = Partial<Record<QuizQuestionId, string>>;
