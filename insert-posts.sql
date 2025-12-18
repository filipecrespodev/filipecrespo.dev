-- Inserir posts no Supabase
-- Execute este SQL no SQL Editor do Supabase

-- Post 1: Introdução ao Nuxt
INSERT INTO posts (slug, title, description, content, published_at, tags)
VALUES (
  'introducao-ao-nuxt',
  'Introdução ao Nuxt 3',
  'Descubra as principais funcionalidades do Nuxt 3 e como começar a desenvolver aplicações Vue.js modernas e performáticas.',
  '# Introdução ao Nuxt 3

Nuxt 3 é a última versão do popular framework Vue.js que facilita a criação de aplicações web modernas. Com melhorias significativas em performance e developer experience, o Nuxt 3 se tornou uma escolha ainda mais atraente para desenvolvedores.

## Por que escolher Nuxt 3?

- **Performance**: Motor Nitro para SSR ultra-rápido
- **TypeScript nativo**: Suporte completo desde o início
- **Auto-imports**: Imports automáticos de componentes e composables
- **File-based routing**: Roteamento baseado em arquivos

## Começando

```bash
npx nuxi init meu-projeto
cd meu-projeto
npm install
npm run dev
```

Com esses simples comandos, você já terá um projeto Nuxt 3 funcionando!',
  '2024-01-15',
  ARRAY['nuxt', 'vue', 'javascript', 'web development']
);

-- Post 2: Laravel PHP Moderno
INSERT INTO posts (slug, title, description, content, published_at, tags)
VALUES (
  'laravel-php-moderno',
  'Laravel: PHP Moderno e Elegante',
  'Explore como o Laravel revolucionou o desenvolvimento PHP com sua sintaxe elegante e ferramentas poderosas.',
  '# Laravel: PHP Moderno e Elegante

O Laravel transformou o desenvolvimento PHP, trazendo elegância e simplicidade para a criação de aplicações web robustas. Com uma comunidade vibrante e ecossistema rico, é uma das melhores escolhas para desenvolvimento backend.

## Características Principais

### Eloquent ORM

O Eloquent torna o trabalho com bancos de dados intuitivo e expressivo:

```php
$users = User::where(''active'', true)
    ->orderBy(''created_at'', ''desc'')
    ->get();
```

### Blade Templates

Sistema de templates poderoso e fácil de usar:

```blade
@foreach($users as $user)
    <p>{{ $user->name }}</p>
@endforeach
```

## Ecossistema Laravel

- **Laravel Forge**: Deploy automatizado
- **Laravel Vapor**: Serverless deployment
- **Laravel Nova**: Painel administrativo elegante
- **Laravel Sanctum**: Autenticação API simples

O Laravel continua evoluindo e se mantém como referência em qualidade no mundo PHP.',
  '2024-02-10',
  ARRAY['laravel', 'php', 'backend', 'framework']
);

-- Post 3: Docker para Desenvolvimento
INSERT INTO posts (slug, title, description, content, published_at, tags)
VALUES (
  'docker-desenvolvimento',
  'Docker para Desenvolvimento',
  'Aprenda como o Docker pode simplificar seu ambiente de desenvolvimento e melhorar a colaboração em equipe.',
  '# Docker para Desenvolvimento

Docker revolucionou a forma como desenvolvemos e distribuímos aplicações. Com containers, você garante que sua aplicação rodará da mesma forma em qualquer ambiente.

## Vantagens do Docker

1. **Consistência**: Mesmo ambiente em desenvolvimento, staging e produção
2. **Isolamento**: Cada serviço em seu próprio container
3. **Portabilidade**: Funciona em qualquer sistema operacional
4. **Eficiência**: Containers compartilham o kernel do host

## Exemplo Básico

Um `docker-compose.yml` simples para uma aplicação web:

```yaml
version: "3.8"
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./src:/var/www/html

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
```

## Comandos Essenciais

```bash
# Construir e iniciar containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down
```

Com Docker, seu time sempre trabalhará no mesmo ambiente, eliminando o famoso "funciona na minha máquina".',
  '2024-03-05',
  ARRAY['docker', 'devops', 'containers', 'desenvolvimento']
);

-- Post 4: Commits Organizados
INSERT INTO posts (slug, title, description, content, published_at, tags)
VALUES (
  'commits-organizados-git',
  'Commits Organizados: A Arte de Versionar Código',
  'Aprenda como criar commits separados e bem organizados que facilitam o trabalho em equipe e a manutenção do código.',
  '# Commits Organizados: A Arte de Versionar Código

Um dos maiores diferenciais entre desenvolvedores iniciantes e experientes está na qualidade dos commits. Commits bem organizados não são apenas uma questão de estética - eles facilitam code review, simplificam rollbacks e tornam o histórico do projeto uma ferramenta poderosa de documentação.

## Por que Commits Organizados Importam?

### 1. Facilitam Code Review

Quando você separa mudanças em commits lógicos, os revisores conseguem entender cada alteração no contexto correto.

### 2. Simplificam Rollbacks

Se um bug é introduzido, commits organizados permitem fazer rollback apenas da mudança problemática.

### 3. Documentam Decisões

O histórico de commits bem escritos conta a história do projeto, explicando não apenas o que mudou, mas por quê.

## Técnicas para Commits Separados

### 1. Git Add Interativo

Use `git add -p` para adicionar mudanças específicas ao staging:

```bash
git add -p arquivo.js
```

### 2. Staging Seletivo

Adicione apenas os arquivos relacionados a uma mudança específica:

```bash
# Commit 1: Nova funcionalidade
git add src/features/login.js
git commit -m "feat: adiciona página de login"

# Commit 2: Correção de bug
git add src/utils/format.js
git commit -m "fix: corrige formatação de data"
```

## Checklist do Commit Perfeito

Antes de fazer commit, pergunte:

- [ ] Este commit faz apenas uma coisa?
- [ ] A mensagem explica claramente o que mudou?
- [ ] O código compila/funciona após este commit?
- [ ] Os testes passam?

Commits bem organizados são uma habilidade fundamental que separa desenvolvedores profissionais de amadores!',
  '2024-03-20',
  ARRAY['git', 'boas-práticas', 'versionamento', 'desenvolvimento']
);

-- Post 5: Conventional Commits
INSERT INTO posts (slug, title, description, content, published_at, tags)
VALUES (
  'conventional-commits',
  'Conventional Commits: Padronização que Faz Diferença',
  'Entenda o padrão Conventional Commits e como ele pode melhorar drasticamente a qualidade do seu histórico Git e automatizar processos.',
  '# Conventional Commits: Padronização que Faz Diferença

**Conventional Commits** é uma especificação que traz padronização, legibilidade e até automação para seu workflow Git.

## O que são Conventional Commits?

Conventional Commits é uma convenção sobre mensagens de commit:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

## Tipos de Commits

**feat**: Nova funcionalidade
```bash
feat: adiciona filtro de busca avançada
```

**fix**: Correção de bug
```bash
fix: corrige cálculo de frete
```

**docs**: Apenas documentação
```bash
docs: atualiza README
```

**refactor**: Refatoração sem mudar comportamento
```bash
refactor: extrai lógica para service
```

## Benefícios Práticos

### Geração Automática de CHANGELOG

Com commits padronizados, ferramentas podem gerar changelogs automaticamente.

### Versionamento Semântico Automático

- `feat` → aumenta MINOR (1.0.0 → 1.1.0)
- `fix` → aumenta PATCH (1.0.0 → 1.0.1)
- `BREAKING CHANGE` → aumenta MAJOR (1.0.0 → 2.0.0)

## Ferramentas

### Commitizen
```bash
npm install -g commitizen
git cz  # ao invés de git commit
```

### Commitlint
Garanta que todos os commits seguem o padrão.

Conventional Commits transforma commits de simples checkpoints em documentação viva do projeto!',
  '2024-03-25',
  ARRAY['git', 'conventional-commits', 'automação', 'changelog']
);

-- Post 6: Organização de Código com Git
INSERT INTO posts (slug, title, description, content, published_at, tags)
VALUES (
  'organizacao-codigo-git',
  'Organização de Código com Git: Estratégias Vencedoras',
  'Descubra estratégias práticas para organizar seu código usando Git, desde estrutura de branches até workflows que escalam.',
  '# Organização de Código com Git: Estratégias Vencedoras

Git não é apenas uma ferramenta de versionamento - é um sistema poderoso de organização de código.

## Estratégias de Branches

### Git Flow

Estrutura de branches bem definida:

```
main (produção)
  └── develop (desenvolvimento)
      ├── feature/login
      └── feature/payment
```

**Quando usar**: Projetos com ciclos de release definidos.

### GitHub Flow

Fluxo simplificado para deploy contínuo:

```
main (sempre deployável)
  ├── feature/add-search
  └── fix/button-alignment
```

**Quando usar**: Aplicações web com CD, SaaS, APIs.

### Trunk-Based Development

Desenvolvimento direto na main com branches de vida curta.

## Estrutura de Commits Atômica

Cada commit deve ser:
- **Completo**: Funciona isoladamente
- **Focado**: Uma mudança lógica
- **Testável**: Testes passam após o commit
- **Revertível**: Pode ser desfeito sem efeitos colaterais

## Workflow de Organização Diária

```bash
# 1. Puxa últimas mudanças
git pull origin develop

# 2. Cria branch para task
git checkout -b feature/user-settings

# 3. Trabalha em pequenos incrementos
git commit -m "feat(settings): adiciona componente"
git commit -m "feat(settings): implementa lógica"

# 4. Push e PR
git push -u origin feature/user-settings
```

## Mantendo Histórico Limpo

### Rebase Interativo

```bash
git rebase -i HEAD~5
```

Organização de código com Git cria um sistema que facilita colaboração e documenta decisões!',
  '2024-03-30',
  ARRAY['git', 'workflow', 'branches', 'organização']
);
