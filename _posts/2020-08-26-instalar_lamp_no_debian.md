---
layout: post
title: Commit Semântico e Versionamento
permalink: commit-semantico-e-versionamento
date: 2020-04-12 09:00:44 +0300
description: A organização dos commits e das versões do sistema tras para um nosso projeto um toque mais profissional, e uma maior clareza para o desenvolvimento e a colaboração no projeto.
fig-caption:
tags: [Git, GitHub, GitLab, Versionamento Vemantico, Covencional Commits, Mensagens de Commit, Tags, Boas praticas github]
---

Passo a passo de como instalar em um servidor debian o famoso LAMP (Linux, Apache, MariaDB, PHP)

Vamos lá!

Primeiramente precisamos atualizar nosso servidor, para disponibilizar os pacotes mais atuais dos repositórios.

```sh
apt update
```

Passo 1 - Instalando o Apache!

```
sudo apt install apache2
```

Para validar está instalção você pode acessar `http://<ip_do_servidor>`;

Passo 2 - Instalando MariaDB

```
sudo apt install mariadb-server
```

O mariadb requer uma configuração previa antes de sua utilização.

```
sudo mysql_secure_installation
```

```
sudo mariadb
```

```
GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

```
mariadb -u admin -p
```

Passo 3 - Instalando PHP

sudo apt install php libapache2-mod-php php-mysql

```
sudo nano /etc/apache2/mods-enabled/dir.conf
```

```
DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
```

```
sudo systemctl restart apache2
```

```
sudo systemctl status apache2
```

Testando a instalação do PHP


```
sudo nano /var/www/html/info.php
```

```
<?php
phpinfo();
?>
```
