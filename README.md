# architecture-nodejs-base

# Pré-requis
  - NodeJS v10.0.0
  - MongoDB Local ou Cloud (db: apiRest)
  - Nodemon
  - (sass optionel)

Pour pouvoir gérer facilement vos versions de npm grâce à NVM:
  - https://github.com/nvm-sh/nvm


# Installer Nodemon
```
sudo npm i nodemon -g
```

# Installer le dossier
```
git clone https://github.com/xdrkush/architecture-nodejs-base.git
cd architecture-nodejs-base
npm i
npm start
```

## Tuto base NodeJS

Dans ce projet nous allons créé un deuxieme layout ( admin ) en + de celui par default

Pour ce faire j'ai bien évidement tout ce qui était en relation avec la base de donnée (plus accessible au débutant)

Donc pour commencer nous devons configurer le module de templating (handlebars) dans notre ./server.js

```
// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    // Ici nous définissons notre nouveau layout
    // Que nous avons créé dans ./views/layouts/adminLayout 
    adminLayout: 'adminLayout'
}));
```

ensuite nous devons aller créé ce fichier  ./views/layouts/adminLayout 
(à vous d'aller voir les partials appeler dans ce layout qui ce trouve dans ./views/partials/adminLayout)

```
{{> adminLayout/head }}

{{> adminLayout/navbar }}

{{{ body }}}

{{> adminLayout/end }}

```

ensuite nous devons créé une route pour redirigé sur notre page Admin
nous allons la créé dans ./api/router.js

```
const adminController = require('./controllers/adminController')
...

// Admin
// 2nd Layout 
router.route('/admin')
    .get(adminController.get)
```

Et maintenant nous devons spécifié a notre controller de désservir notre page admin dans notre adminLayout
```
module.exports = {
    get: (req, res) => {
        res.render('admin', {
            // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
            layout: 'adminLayout'
        })
    }
}
```

Et voila vous avez maintenant un deuxieme layout admin configuré proprement avec handlebars

!!! attention au branch !!!

désolé d'avance ^^

# J'espère que ça pourra vous aidez.
