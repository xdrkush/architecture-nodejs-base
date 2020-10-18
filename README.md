# architecture-nodejs-base

## Tuto base NodeJS

Ce projet est une copie de la branch master avec une db MYSQL

# Pré-requis
  - NodeJS v10.0.0
  - MySql
  - Nodemon
  - (sass optionel)

# Installer Node JS
https://github.com/nodesource/distributions/blob/master/README.md

Pour pouvoir gérer facilement vos versions de npm grâce à NVM:
  - https://github.com/nvm-sh/nvm

# Installer Nodemon
```
sudo npm i nodemon -g
```

# Lancer MySql (local)
```
sudo systemctl start mysql.service
```

Pour le script sql:
  - dans un terminal: 

```
mysq -u user -p
Enter Password:

CREATE DATABASE IF NOT EXISTS `crud_tutorial` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE crud_tutorial;

CREATE TABLE  `customers` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 100 ) NOT NULL ,
`email` VARCHAR( 100 ) NOT NULL ,
`mobile` VARCHAR( 100 ) NOT NULL
) ENGINE = INNODB;

```

## or

```
cd ./crud-php-mysql

mysq -u user -p
Enter Password:

SOURCE scripts.sql;

```

# Installer le dossier
```
git clone https://github.com/xdrkush/architecture-nodejs-base.git
cd architecture-nodejs-base
npm i
npm start
```

!!! attention au branch !!!

désolé d'avance ^^

# J'espère que ça pourra vous aidez.
