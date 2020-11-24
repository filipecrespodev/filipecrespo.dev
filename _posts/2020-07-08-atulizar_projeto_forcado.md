---
layout: post
title: Como Atualizar um Projeto Forcado?
# permalink: como-atualizar-um-projeto-forcado
date: 2020-04-12 09:00:44 +0300
description: Para atualizar um repositório forcado precisamos configurar o upstream com a url do projeto original.
fig-caption:
category: Linux
tags:
  - Git
  - GitHub
  - GitLab
  - Fork
  - Atualizando projeto forcado
---

Após termos clonado um projeto para nossa conta do Github ou GitLab o nosso projeto pode ficar desatualizado em relação ao projeto original.

Isso pode causar dois problemas na realização de pull requests pois a sua branch não vai estar igual a banch de destido no PR.

O outro problema é conseguir atualizar o seu projeto de novas atualizações ou correções no projeto.
Para isso precisamos configurar em nosso local o endereço remoto do projeto original como upstream nas configurações do `.git/config` na pasta do projeto.

Utilizamos o seguinte comando:

```bash
git remote add upstream https://github.com/usuario/projeto.git
```

Com isso nosso `.git/config` ficará da seguinte forma:

```vim
[core]
  repositoryformatversion = 0
  filemode = true
  bare = false
  logallrefupdates = true
[remote "origin"]
  url = git@github.com:<seu usuario>/projeto.git
  fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
  remote = origin
  merge = refs/heads/master
  rebase = true
[remote "upstream"]
  url = https://github.com/<usuario original>/projeto.git
  fetch = +refs/heads/*:refs/remotes/upstream/*
```

O proximo passo é atualizar nosso local com as informações do repositório original. Para isso podemos rodar o seguinte comando:

```bash
git fetch upstream
```

Certifique-se de que você está no branch master:

```bash
git checkout master
```

Reescreva o seu branch master, de forma que os seus commits que não estão no projeto original apareçam, e que os seus commits fiquem no topo da lista:

```bash
git rebase upstream/master
```

Caso o seu projeto não contenha commit adicinais, ou não queira mantelos e sim atulizar sua master com o projeto original pode utilizar o seguinte comando:

```bash
git reset --hard upstream/master
```

Se você não quiser reescrever o histórico do seu branch master (talvez porque alguém já o tenha clonado) então você deve substituir o último comando por um

```bash
git merge upstream/master
```

Por fim pode atulizar seu repositório remoto com as alterações

```bash
git push origin master
```
