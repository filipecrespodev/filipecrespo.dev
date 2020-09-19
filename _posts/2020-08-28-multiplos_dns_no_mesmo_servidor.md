---
layout: post
title: Virtual 
# permalink: commit-semantico-e-versionamento
date: 2020-04-12 09:00:44 +0300
description: Passo a passo de como instalar em um servidor debian o famoso LAMP (Linux, Apache, MariaDB, PHP).
fig-caption:
category: Linux
tags:
  - Debian
  - LAMP
  - Linux
  - PHP
---

Passo a passo de como instalar em um servidor debian o famoso LAMP (Linux, Apache, MariaDB, PHP)

Vamos lá!

Primeiramente precisamos atualizar nosso servidor, para disponibilizar os pacotes mais atuais dos repositórios.

#### Atualizando o Debian

```sh
apt update && apt upgrade
```

#### Instalando o Apache

```
sudo apt install apache2
```

Para validar está instalção você pode acessar `http://<ip_do_servidor>`

#### Instalando MariaDB

```
sudo apt install mariadb-server
```

Configurando o banco de dados, usuario root e permissão de acesso:

```
sudo mysql_secure_installation
```

#### Instalando PHP

```
apt install php libapache2-mod-php php-mysql
```

Configurando o PHP:

Substituir a order de leitura do arquivos no arquivo `/etc/apache2/mods-enabled/dir.conf`, para a seguinte ordem:

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
