# Quiz Galáctico

Projeto didático em React + TypeScript + Vite para Vercel. Demonstra um funil interativo semelhante ao utilizado em landing pages comerciais, mas com conteúdo, regras e ilustrações fictícios.

## Estado atual — etapa 4: responsividade e animações do funil

- Landing page responsiva com ilustrações SVG próprias e identidade **Sci-Fi Vector Arcade** (retrofuturismo vetorial).
- Quiz de cinco perguntas, com quatro alternativas cada.
- Reações contextuais com digitação progressiva; avanço automático **somente após o texto terminar**, navegação para trás e barra de progresso.
- Formulário de demonstração com validação de nome e telefone fictícios.
- Tela de carregamento temporizada (1,9 s), seguida de uma comemoração curta com confetes antes do resultado.
- Recomendação determinística de uma entre **seis naves fictícias**, calculada pelas cinco respostas; cada nave tem silhueta, paleta e características próprias.
- Resultado com ilustração, características, justificativas e resumo de respostas.
- Botões para copiar o relatório, refazer o teste e retornar ao início.
- Layout adaptado a celulares pequenos, médios e grandes, tablets e dispositivos em paisagem.
- Áreas de toque dimensionadas, suporte às margens seguras do celular, formulários sem zoom automático e retorno ao topo em cada etapa.
- Estilos responsivos separados em `src/styles/responsive.css`.
- Retrato vetorial da comandante **NOVA**, compartilhado entre cabeçalho, introdução e diálogos; transição temática entre perguntas.
- Trilha espacial original sintetizada com Web Audio, com controle fixo de nota musical para desligar **todos os sons**; o botão fica translúcido quando silenciado.
- Efeitos exclusivos de clique, seleção, transição, texto digitado, varredura, carregamento, erro, comemoração e revelação.
- Vercel Web Analytics integrado para estatísticas de visitantes e visualizações de página, condicionado à habilitação no painel.
- Prévia de compartilhamento com miniatura quadrada 1200 × 1200 no WhatsApp e arte horizontal 1200 × 630 no Twitter.

## Privacidade e limite da simulação

Não existe backend nem integração com WhatsApp. **O Vercel Web Analytics coleta métricas de visita e visualização de página quando habilitado no projeto Vercel**, mas o aplicativo não envia nomes, telefones ou respostas do quiz para esse serviço. O formulário não usa armazenamento local nem envia seus campos a servidores. O telefone informado é **validado e descartado** na transição do formulário; somente o primeiro nome permanece temporariamente no estado React, até reiniciar ou fechar a página.

Use dados **fictícios** ao testar o formulário. O botão de copiar gera um relatório local sem telefone. Todas as naves e suas características são inventadas.

## Executar

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Validar o projeto:

```bash
npm run typecheck
npm run build
npm run preview
```

## Publicar na Vercel

1. Importe este repositório na Vercel.
2. Framework: **Vite**.
3. Build: `npm run build`.
4. Diretório de saída: `dist`.

Essas opções também estão presentes em `vercel.json`. Nenhuma variável de ambiente é necessária.

### Habilitar Web Analytics

1. No painel do projeto na Vercel, acesse **Analytics** e clique em **Enable** se ainda não estiver habilitado.
2. Depois de habilitar, gere um novo deploy de produção, caso a Vercel não tenha configurado as rotas de insights no deploy atual.
3. A aplicação já carrega `@vercel/analytics/react` em `src/main.tsx`; o script coleta apenas page views por padrão. Nenhum evento personalizado foi criado.
4. Visite o site publicado e confira o painel Analytics. Se necessário, observe no DevTools uma requisição de visualização do Analytics, normalmente sob `/_vercel/insights/` ou um caminho exclusivo configurado pela Vercel.

A habilitação do recurso no painel é uma configuração da conta Vercel e não é realizada apenas ao alterar o repositório GitHub.

## Organização

```text
src/
  App.tsx                          # Orquestra as telas e o estado do fluxo
  main.tsx                         # Inicializa React e Vercel Web Analytics
  components/
    SiteHeader.tsx                 # Retrato da Nova e progresso
    NovaPortrait.tsx               # Uma única imagem da Nova em todas as telas
    TypewriterText.tsx             # Digitação progressiva das reações
    MusicToggle.tsx                # Controle fixo para ligar/desligar todo o áudio
    RocketIllustration.tsx         # Foguete com retículas de navegação
    ArcadeBackdrop.tsx             # Cenário vetorial decorativo, sem eventos
    HudGlyph.tsx                   # Símbolo de radar vetorial (reservado)
    ShipIllustration.tsx           # Silhuetas SVG por nave
  features/
    audio/
      spaceMusic.ts                 # Motor único: música + efeitos Web Audio
      SoundProvider.tsx             # Contexto de áudio para todos os componentes
    quiz/
      questions.ts                 # Dados das cinco perguntas
      useQuiz.ts                   # Estado e transições do questionário
    recommendation/
      ships.ts                     # Catálogo fictício
      recommend.ts                 # Regras e pontuação determinística
  screens/
    HomeScreen.tsx                 # Abertura
    CelebrationScreen.tsx          # Confetes e anúncio do resultado
    QuizScreen.tsx                 # Questões
    LeadScreen.tsx                 # Formulário local demonstrativo
    LoadingScreen.tsx              # Carregamento temporizado
    ResultScreen.tsx               # Resultado e relatório
  styles/
    global.css                     # Estilos base, identidade e efeitos temáticos
    responsive.css                 # Layouts fluidos, breakpoints, toque e safe areas
    arcade.css                     # Retrofuturismo vetorial e efeitos de navegação
    home-viewport.css              # Abertura minimalista e altura responsiva
```

## Etapas

1. Base e tela inicial — concluída.
2. Quiz e feedback dinâmico — concluída.
3. Formulário, carregamento e recomendação — implementada.
4. Responsividade e refinamentos do fluxo — **implementados**. Build e conferência visual em dispositivos reais devem ser confirmados no deploy Vercel; a conexão do deploy é gerenciada pelo proprietário do repositório.

### Como funciona o mecanismo de recomendação

`recommendShip(answers)` valida as cinco respostas e acumula pontos para cada nave. Cada escolha favorece três modelos, com pontuações diferentes. A nave com maior pontuação é recomendada; em empate, prevalece a ordem estável do catálogo. A mesma combinação de respostas sempre gera a mesma recomendação. A camada visual não contém as regras de pontuação.

## Conferência de responsividade

Larguras sugeridas para inspeção no DevTools: **280, 320, 360, 375, 390, 414, 430, 540, 768 e 820 CSS px**. Conferir todas as telas: abertura, cinco perguntas, formulário com teclado aberto, carregamento e resultado. Verificar também landscape e zoom de texto. Nenhuma etapa depende de rolagem horizontal.

## Comportamento das animações

1. Após selecionar uma alternativa, a página mostra o diálogo e digita a reação da Nova, caractere a caractere.
2. Somente depois do último caractere (e de uma curta pausa de leitura) o estado do quiz avança. O tempo deixa de ser fixo por resposta.
3. A próxima pergunta entra com uma transição breve de chegada espacial. O fluxo funciona também quando o usuário volta uma etapa.
4. Depois do carregamento, o aplicativo exibe uma comemoração curta com confetes e então revela a nave recomendada.
5. Em dispositivos com **reduzir movimento** ativado, o texto surge de uma só vez e as animações decorativas são removidas.

Os efeitos são CSS/React locais, sem bibliotecas de animação nem chamadas externas. O retrato de Nova é um SVG original do projeto.

## Música ambiente e efeitos de interface

- O áudio inicia **ativado por padrão**. O navegador tenta reproduzir a música ao carregar a página.
- **Restrição dos navegadores:** em muitos celulares a música audível só pode começar no primeiro gesto do usuário (toque, clique ou tecla). A aplicação tenta desbloqueá-la já nesse primeiro gesto, sem exigir que o usuário toque na nota musical. Não é tecnicamente possível ignorar uma política de autoplay com som.
- O botão de nota musical fica no canto inferior direito. Somente tocar nele desliga música e efeitos; ao desativar, fica quase transparente. Outro toque reativa.
- Trilha e efeitos são sintetizados por uma única instância de Web Audio; não há downloads de áudio, bibliotecas, dados pessoais nem integração externa.
- Botões comuns emitem um clique; alternativas têm som de confirmação; transições e mensagens digitadas têm efeitos próprios.
- Digitação produz bipes espaçados (limitados para não sobrecarregar a trilha). Carregamento emite pulsos de varredura e um breve aviso sonoro de conclusão antes dos confetes; comemoração e revelação têm assinaturas sonoras diferentes.
- A música permanece no fluxo completo; não reinicia a cada pergunta. Efeitos sonoros param imediatamente quando o usuário silencia.
- Teclado, toque e mouse são suportados; a liberação de áudio ocorre na primeira interação permitida.

## Prévia de compartilhamento (WhatsApp, Facebook e X)

O WhatsApp usa uma miniatura compacta quadrada em certas conversas, recortando a imagem horizontal. A imagem Open Graph principal agora é `https://funil-de-vendas-interativo.vercel.app/og-whatsapp.png` (1200 × 1200) com a nave e o título centralizados, para reduzir cortes indesejados. O app controla a forma de exibir o cartão; não há garantia de uma prévia horizontal completa.

O PNG quadrado é gerado de `public/og-whatsapp.svg`. A capa horizontal continua como `public/og-preview.svg` e `og-preview.png` para Twitter/X. O build usa Sharp para gerar os dois PNGs antes de compilar o Vite, e os metadados são estáticos no HTML.

Teste a imagem diretamente em `https://funil-de-vendas-interativo.vercel.app/og-whatsapp.png` e depois compartilhe `https://funil-de-vendas-interativo.vercel.app/?preview=2` para contornar um possível cache antigo do WhatsApp.

## Seis naves e identidade visual do resultado

Os seis resultados possíveis são: **Aurora ZX** (verde, exploradora delta), **Nebulon Q5** (azul, científica arredondada), **Solaris Prime** (dourada, nave de comando), **Vortex XR** (vermelha, interceptadora), **Atlas Cruiser** (laranja, cargueira blindada) e **Onyx Phantom** (roxa, furtiva em formato de manta). Cada uma possui SVG original, recursos, descrição e perfil próprio.

A pontuação é baseada nas cinco respostas, validada contra todas as alternativas em `questions.ts`. Cada resposta atribui pontos de afinidade a três modelos. O desempate é estável, e nenhum sorteio influencia o resultado. A tela final usa `--ship-accent` e `--ship-shade` para harmonizar o cartão com a nave sem alterar as demais telas.

## Direção artística: Sci-Fi Vector Arcade

O design conserva sua hierarquia, botões, formulário, barra de progresso e tema verde. A direção artística é aplicada **por cima**, com efeitos discretos de computador de bordo: starfield vetorial decorativo, órbitas e coordenadas, emblema de radar, cantos técnicos, scanner e marcadores holográficos em torno de cada nave. As seis silhuetas e cores próprias permanecem distintas. A personagem Nova tem acessórios de comunicação e visor translúcido no SVG original.

A decoração usa SVG e CSS locais sem bibliotecas, scripts de animação em loop ou coleta de informações. O plano de fundo é marcado como decorativo (`aria-hidden`) e não intercepta eventos. Acessibilidade: animações de atmosfera respeitam `prefers-reduced-motion`; textos e botões continuam HTML sem sobreposição dos gráficos.

Arquivos relevantes: `src/styles/arcade.css`, `src/components/ArcadeBackdrop.tsx`, `src/components/HudGlyph.tsx`, `src/components/RocketIllustration.tsx`, `src/components/ShipIllustration.tsx` e `public/nova-avatar.svg`.

## Refinamento da abertura e da comandante Nova

A identidade Sci-Fi Vector Arcade ganhou uma personagem vetorial mais detalhada, com **olhos abertos, íris, pupilas e reflexos**, headset, visor transparente, uniforme de bordo e elementos de HUD. A URL versionada do SVG evita que a imagem antiga permaneça em cache no navegador. **O arquivo `public/nova-avatar.svg` é a única fonte do retrato.** O componente `src/components/NovaPortrait.tsx` o reutiliza em escalas adaptativas no cabeçalho, na mensagem inicial e nos diálogos de pergunta, identificação e resultado.

A tela inicial foi posteriormente **simplificada**: permanecem apenas título, uma frase curta, foguete e botão COMEÇAR MISSÃO, enquanto o retrato da Nova continua no cabeçalho e nas demais etapas. Foram removidos o cartão de boas-vindas, faixas promocionais, indicadores e legendas decorativas da abertura. O título usa cores sólidas, sem sombras deslocadas, evitando sobreposição visual. Não foram alterados formulário, recomendações, perguntas, áudios ou dados enviados.

## Tela inicial sem rolagem em celulares

A tela inicial recebe a classe `app-shell--home` e um grid de **quatro faixas** em `src/styles/home-viewport.css`: título, descrição, foguete flexível e CTA. Em celulares no modo retrato, usa `100dvh` (com fallback), reserva espaço para cabeçalho e rodapé e destina o espaço livre ao SVG. O layout fica mais leve em todos os tamanhos, com a nave como destaque. A apresentação da Nova e os indicadores extras permanecem ausentes apenas da abertura.

A solução evita rolagem nas alturas usuais, mas **não oculta conteúdo quando há zoom do navegador, fontes ampliadas ou viewport excepcionalmente baixo**. Nesses cenários, rolar é preferível a cortar o botão ou elementos de acessibilidade. Outras telas não são alteradas.
