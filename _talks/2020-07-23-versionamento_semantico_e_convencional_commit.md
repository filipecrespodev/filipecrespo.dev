---
layout: post
title: Commit Semântico e Versionamento
permalink: commit-semantico-e-versionamento
date: 2020-04-12 09:00:44 +0300
description: A organização dos commits e das versões do sistema tras para um nosso projeto um toque mais profissional, e uma maior clareza para o desenvolvimento e a colaboração no projeto.
fig-caption:
tags: [Git, GitHub, GitLab, Versionamento Vemantico, Covencional Commits, Mensagens de Commit, Tags, Boas praticas github]
---

Quando estamos começando a desenvolver e salvar nossos projetos em um repositório temos uma dificuldade muito grande em realizar os commits de forma organizada e clara, para que outros desenvolvedores ou nós mesmo passamos ver aquilo que está acontecendo no projeto. Com as convenções [SemVer](https://semver.org/lang/pt-BR/) e o [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/) fica mais claro de entender a melhor maneira de administrarmos nosso repositório.

O uso de tais praticas trás diversas vantagens para nosso projeto, como por exemplo um histórico de alterações mais clara sendo mais facil localizar uma mudança no projeto, alem disso conseguimos distribuir nosso sistemas utilizando as tags sendo mais facil para quem utilizar identificar as atualizações realidas ou disponiveis.

O primeiro passo é ter commits e suas mensagens claras e expecificas, ou seja, sempre que um novo codigo for adicionado no repositório deve conter o seguinte formato em sua mensagem.

```bash
<tipo>(<funcionalidade>): <descrição>

<descrição (opcional)>

<Rodapé (opcional)>
```

### Exemplos

#### Commit de uma nova funcionalidar

```bash
feat: add new feature x
```

#### Commit de rafatoração de um codigo

```bash
refactor!: refactor class user
```

#### Commit de documentaçãofuncionalidade

```bash
docs: correct spelling of CHANGELOG
```

#### Commit de uma parte de uma funcionalidade

```bash
feat(lang): add portuguese language
```

Seguindo esta organização conseguimos localizar em nosso projeto as alterações realizadas

![Commits seguindo convencional commits](/assets/img/posts/commits-seguindo-converncional-commits.png)

### Bibliografia

- [SemVer](https://semver.org/lang/pt-BR/)
- [Convencional commit](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/)
