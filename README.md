# WorldMix360

O WorldMix360 é uma vitrine de produtos e ofertas com navegação por categorias, páginas de produtos e conteúdo editorial. O projeto também inclui uma área administrativa para gerenciar o catálogo e o blog.

## Capturas de tela

### Versão desktop

![WorldMix360 em uma tela desktop](./.github/WorldMix360-desktop.png)

### Versão mobile

![WorldMix360 em uma tela mobile](./.github/WorldMix360-mobile.png)

## Funcionalidades

- Explorar produtos, ofertas, mais vendidos e categorias.
- Consultar detalhes de produtos e acessar ofertas de marketplaces.
- Navegar por conteúdo editorial no blog.
- Criar uma conta e entrar na plataforma.
- Acessar uma área administrativa protegida para gerenciar produtos, categorias, subcategorias, marketplaces e artigos do blog.
- Integrar operações do catálogo com o Mercado Livre, incluindo análise, importação e sincronização de produtos.

## Tecnologias

- React 19 e TypeScript
- Vite
- Tailwind CSS
- React Router
- Swiper

## Requisitos

- Node.js e npm
- O backend da aplicação disponível. Por padrão, o frontend espera a API em `http://localhost:3333`.

> Este repositório contém o frontend. Para carregar dados, autenticar usuários e usar as funções administrativas, configure e execute também o backend compatível com a API do WorldMix360.

## Como executar localmente

1. Instale as dependências:

   ```bash
   npm ci
   ```

2. Crie um arquivo `.env` na raiz do projeto. Você pode partir do exemplo:

   ```bash
   cp .env.example .env
   ```

   No Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Se necessário, ajuste a URL da API no arquivo `.env`:

   ```dotenv
   VITE_API_URL=http://localhost:3333
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Executa a verificação TypeScript e gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente a versão de produção gerada. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run generate-md` | Executa o gerador de documentação Markdown do projeto. |

## Estrutura do projeto

```text
src/
├── assets/       # Imagens e ícones
├── components/   # Componentes reutilizáveis e layouts
├── contexts/     # Estado compartilhado e comunicação com a API
├── pages/        # Páginas públicas e administrativas
├── routes/       # Definição das rotas da aplicação
├── services/     # Integrações com serviços externos
├── types/        # Tipos TypeScript
└── utils/        # Funções utilitárias
```

## Configuração

| Variável | Descrição | Padrão |
| --- | --- | --- |
| `VITE_API_URL` | URL base do backend consumido pelo frontend. | `http://localhost:3333` |

O arquivo `.env.example` contém a configuração local padrão. Variáveis com prefixo `VITE_` são incluídas no bundle do frontend; não armazene nelas senhas, tokens privados ou outros segredos.
