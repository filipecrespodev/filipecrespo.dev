---
title: "Docker para Desenvolvimento"
description: "Aprenda como o Docker pode simplificar seu ambiente de desenvolvimento e melhorar a colaboração em equipe."
publishedAt: "2024-03-05"
tags: ["docker", "devops", "containers", "desenvolvimento"]
---

# Docker para Desenvolvimento

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

Com Docker, seu time sempre trabalhará no mesmo ambiente, eliminando o famoso "funciona na minha máquina".
