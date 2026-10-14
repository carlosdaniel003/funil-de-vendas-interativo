# Quiz Galáctico

Projeto didático em React + TypeScript + Vite, pronto para ser hospedado na Vercel. Inspira-se no padrão de navegação de um quiz comercial, mas usa conteúdo e ilustrações fictícios e próprios.

## Estado atual — etapa 1

- Estrutura React e TypeScript com verificações estritas.
- Tela inicial responsiva, personagem fictício e ilustração SVG original.
- Cabeçalho e navegação básica de ida/volta.
- Botão de início abre a tela de entrada do quiz.

**Ainda não implementado:** perguntas, respostas, transições entre questões, formulário, tela de carregamento e recomendação. Esses recursos pertencem às próximas etapas e não devem ser confundidos com funcionalidades prontas.

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
4. Faça o deploy. Não há necessidade de variáveis de ambiente na etapa 1.

## Estrutura

```text
src/
  App.tsx                     # Ponto de controle de navegação
  components/
    SiteHeader.tsx            # Status e espaço reservado ao progresso
    RocketIllustration.tsx    # Ilustração vetorial própria
  screens/
    HomeScreen.tsx            # Tela inicial
    QuizEntryScreen.tsx       # Entrada na experiência; etapa 2 pendente
  styles/
    global.css                # Tokens de tema, layout e responsividade
  main.tsx                    # Bootstrap React
public/
  favicon.svg
```

## Próximas etapas propostas

2. Modelar perguntas e opções por dados TypeScript e implementar o fluxo com barra de progresso e respostas contextualizadas.
3. Adicionar formulário de demonstração, carregamento e recomendações fictícias definidas por regras.
4. Refinar a experiência e validar o fluxo completo em ambiente de produção na Vercel.

O projeto não armazena dados pessoais nem envia informações para serviços externos.
