# architecture-nodejs-base

## Tuto base NodeJS

Dans ce projet vous allez trouvez pas mal de petite source pour commencer sur Node JS avec NPM
L'objectif est bien de partir de l'architecture-node-js branch master pour lui greffé de multiple Module.

Et de biensur vous en proposer des tutos simples d'utilisation.

Plusieurs branch à votre disposition:
 - master (branch cloner pour réaliser un module (OK))
 - Recup-DB-Atlas (sortir un json de la db complete (en cours))
 - algolia (config et recherche faites grace à algolia (OK))
 - accept-cookie (voir comment intéragir avec les cookies (OK))
 - backup (comment réaliser un backup (en cours))
 - bootstrap (bootstrap est intégrer de façon a pouvoir ajouter des modules (OK))
 - cron (réaliser une tache cron,répétitive (en cours))
 - dark-mode (base pour réaliser un dark-mode (OK))
 - date (formattage des dates (OK))
 - image (gèrer les images (en cours))
 - init (branch d'orgine)
 - jwt (base JWT) (OK, manque le readme))
 - light (branch la plus light (OK))
 - mocha (gerer les test unitaire avec mocha, ... (en cours))
 - multer-array (gérer un tableau d'image avec une DB (en cours))
 - nodemailer (gérer les mail (en cours))
 - page ID (réaliser un page ID liaison avec un article défini et c'est commentaire (OK))
 - passport-google (inscription google API (en cours))
 - populate (Fonction MongoDB de relation entre Model (OK manque le readme a editer))
 - reqFlash (gerer req.flash, plusieurs manières proposer (OK))
 - secondLayout (gerer un deuxieme layout avec Handlebars(OK))
 - validator (gerer validator.js, base (en cours))
 - vanta (intégrer vanta.js (en cours))

# Pré-requis
  - NodeJS v10.0.0
  - MongoDB Local ou Cloud (db: apiRest)
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

# Lancer Mongo DB (local)
```
sudo mongod
```

Vous pouvez creer votre DB Cloud sur MongoAtlas Gratuitement (vous serez obligez de creer un compte)
  - https://www.mongodb.com/cloud/atlas

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
