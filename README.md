# Quiz Galáctico

Projeto didático em React + TypeScript + Vite, pronto para ser hospedado na Vercel. Inspira-se no padrão de navegação de um quiz comercial, mas usa conteúdo e ilustrações fictícios e próprios.

## Estado atual — etapa 2

- Estrutura React e TypeScript com verificações estritas.
- Tela inicial responsiva, personagem fictício e ilustração SVG original.
- Cabeçalho e navegação básica de ida/volta.
- Botão de início abre um quiz de cinco perguntas fictícias.
- Respostas com reações contextualizadas, avanço automático, progresso e navegação de retorno.
- Tela de conclusão com resumo das respostas e reinício do quiz.

**Ainda não implementado:** formulário, tela de carregamento e recomendação personalizada. Esses recursos pertencem à etapa 3. As respostas são mantidas apenas em memória enquanto a página estiver aberta.

## Rodar localmente

Requisito: Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Para validar uma compilação de produção:

```bash
npm run build
npm run preview
```

## Publicar na Vercel

1. Envie o conteúdo do projeto a um repositório Git.
2. Na Vercel, importe o repositório.
3. Use framework `Vite`, comando `npm run build` e diretório de saída `dist` (também definidos em `vercel.json`).
4. Faça o deploy. Não há necessidade de variáveis de ambiente nas etapas 1 e 2.

## Estrutura

```text
src/
  App.tsx                     # Ponto de controle de navegação e estado do quiz
  components/
    SiteHeader.tsx            # Status e indicador real de progresso
    RocketIllustration.tsx    # Ilustração vetorial própria
  features/quiz/
    questions.ts              # Perguntas, opções e falas fictícias tipadas
    useQuiz.ts                # Estado, avanço temporizado e navegação
  screens/
    HomeScreen.tsx            # Tela inicial
    QuizScreen.tsx            # Questionário e tela de conclusão
  styles/
    global.css                # Tokens de tema, layout e responsividade
  main.tsx                    # Bootstrap React
public/
  favicon.svg
```

## Próximas etapas propostas

3. Adicionar formulário de demonstração, carregamento e recomendações fictícias definidas por regras.
4. Refinar a experiência e validar o fluxo completo em ambiente de produção na Vercel.

O projeto não armazena dados pessoais nem envia informações para serviços externos.
