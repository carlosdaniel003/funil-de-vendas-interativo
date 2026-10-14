# Quiz Galáctico

Projeto didático em React + TypeScript + Vite para Vercel. Demonstra um funil interativo semelhante ao utilizado em landing pages comerciais, mas com conteúdo, regras e ilustrações fictícios.

## Estado atual — etapa 4: responsividade mobile

- Landing page responsiva com ilustrações SVG próprias.
- Quiz de cinco perguntas, com quatro alternativas cada.
- Reações contextuais, avanço automático, navegação para trás e barra de progresso.
- Formulário de demonstração com validação de nome e telefone fictícios.
- Tela de carregamento temporizada (1,9 s).
- Recomendação determinística de uma entre quatro naves fictícias, calculada pelas cinco respostas.
- Resultado com ilustração, características, justificativas e resumo de respostas.
- Botões para copiar o relatório, refazer o teste e retornar ao início.
- Layout adaptado a celulares pequenos, médios e grandes, tablets e dispositivos em paisagem.
- Áreas de toque dimensionadas, suporte às margens seguras do celular, formulários sem zoom automático e retorno ao topo em cada etapa.
- Estilos responsivos separados em `src/styles/responsive.css`.

## Privacidade e limite da simulação

Não existe backend ou integração com WhatsApp. Os dados não são enviados para nenhum endpoint, analytics ou armazenamento local. O telefone informado é **validado e descartado** na transição do formulário; somente o primeiro nome permanece temporariamente no estado React, até reiniciar ou fechar a página.

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

## Organização

```text
src/
  App.tsx                          # Orquestra as telas e o estado do fluxo
  components/
    SiteHeader.tsx                 # Progresso e status
    RocketIllustration.tsx         # Ilustração da abertura
    ShipIllustration.tsx           # Silhuetas SVG por nave
  features/
    quiz/
      questions.ts                 # Dados das cinco perguntas
      useQuiz.ts                   # Estado e transições do questionário
    recommendation/
      ships.ts                     # Catálogo fictício
      recommend.ts                 # Regras e pontuação determinística
  screens/
    HomeScreen.tsx                 # Abertura
    QuizScreen.tsx                 # Questões
    LeadScreen.tsx                 # Formulário local demonstrativo
    LoadingScreen.tsx              # Carregamento temporizado
    ResultScreen.tsx               # Resultado e relatório
  styles/
    global.css                     # Estilos base, identidade visual e animações
    responsive.css                 # Layouts fluidos, breakpoints, toque e safe areas
```

## Etapas

1. Base e tela inicial — concluída.
2. Quiz e feedback dinâmico — concluída.
3. Formulário, carregamento e recomendação — implementada.
4. Responsividade para celulares e refinamentos de navegação — **implementados**. Build e conferência visual em dispositivos reais devem ser confirmados no deploy Vercel; a conexão do deploy é gerenciada pelo proprietário do repositório.

### Como funciona o mecanismo de recomendação

`recommendShip(answers)` valida as cinco respostas e acumula pontos para cada nave. Cada escolha favorece dois modelos, com pontuações diferentes. A nave com maior pontuação é recomendada; em empate, prevalece a ordem estável do catálogo. A mesma combinação de respostas sempre gera a mesma recomendação. A camada visual não contém as regras de pontuação.

## Conferência de responsividade

Larguras sugeridas para inspeção no DevTools: **280, 320, 360, 375, 390, 414, 430, 540, 768 e 820 CSS px**. Conferir todas as telas: abertura, cinco perguntas, formulário com teclado aberto, carregamento e resultado. Verificar também landscape e zoom de texto. Nenhuma etapa depende de rolagem horizontal.
