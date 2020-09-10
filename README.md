# architecture-nodejs-base
1
## Tuto base NodeJS

Dans ce projet nous allons expérimenter l'import du framework bootstrap

# Pré-requis
  - NodeJS v10
  - npm < 6
  - nodemon
  - sass


# Installer le dossier
```
git clone https://github.com/xdrkush/architecture-nodejs-base.git
cd architecture-nodejs-base
npm i
npm start
```

Petite astuce pour compiler bootstrap avec nos modules fait maison

Je propose de creer un fichier:
```
./public/css/sass/index.sass
```

ensuite récupéré le sass racine de bootstrap dans notre fichier index.sass:
```
@import '../../../node_modules/bootstrap/scss/bootstrap.scss'
```

et nous pouvons creer notre sass à coté de celui de bootstrap
```
@import './style.sass'
```
Si vous allez voir a l'intérieur vous verrez l'import de nos modules

et nous pouvons run la commande sass dans le package.json:
```
npm run sass
```

en cas d'erreur dans le fichier _root de bootstrap c'est la boucle qui cause soucis
Je vous ai mit un fichier help avec les recommandations a prendre en compte (simple)

## Source:
  - https://www.npmjs.com/package/bootstrap

# J'espère que ça pourra vous aidez.
