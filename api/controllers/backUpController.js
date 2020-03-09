const fs = require('fs'),
      App = require('../database/App')
    //   Tuto = require('../database/Tuto')

module.exports = {
    get: async (req, res) => {
        // Définition de nos futur tableaux à exporter
        const dbApps = []
            //   dbTutos = []

        // Montage de nos list grace a l'apelle de nos constructeur Mongoose, et on éffectue une recherche avec find()   
        const dbApp = await App.find()
            //   dbTuto = await Tuto.find()

        // On push nos liste dans nos tableaux pour avoir un beau json   
        // dbTutos.push(dbTuto)
        // dbApps.push(dbApp)
        for (let i = 0; i < dbApp.length; i++) {
              dbApps.push(dbApp[i])
        }

        // Et on lui dit de nous les stockers la bas ...
        fs.writeFileSync('app.json', dbApps, (err) => {
            if (err) console.log(err)
        })
        // fs.writeFileSync('./api/backup/tuto.json', dbTutos)

        console.log(dbApps)

        // console.log(dbApps)

        console.log('coucouccoucouocu')
        
        
        // On renvoie nos data sur notre page au format json
        res.send('coucou')
    }
}