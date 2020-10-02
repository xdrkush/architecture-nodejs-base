/*
 * Ici nous créons un back up pour une collection en particulier
 * ************************************************************* */ 

// Backup
var urlDb = 'mongodb://localhost:27017/apiRest',
  fs = require('fs'),
  format = require('date-format'),
  Article = require('../../api/database/Article'),
  User = require('../../api/database/User'),
  Cron = require('cron').CronJob;

// Tache cron
new Cron('1 * * * * *', async (next) => {
  console.log('BackUp Manual toute les 1 minutes');

  // Articles
  const dbArticle = await Article.find({})
  let dataArticle = JSON.stringify(dbArticle, null, 2)
  fs.writeFile('./BackUp/backUpManual/Article/backArticle-'
                + format.asString('dd-MM-yyyy_hh:mm:ss', new Date())
                + '.json', dataArticle, (err) => {
    if(err) console.log(err)
    else console.log('BackUp Manual Finish // Article: ' + format.asString('le dd/MM/yyyy à hh:mm:ss', new Date()) )
  })

  // User
  const dbUser = await User.find({})
  let dataUser = JSON.stringify(dbUser, null, 2)
  fs.writeFile('./BackUp/backUpManual/User/backUser-'
                + format.asString('dd-MM-yyyy_hh:mm:ss', new Date())
                + '.json', dataUser, (err) => {
    if(err) console.log(err)
    else console.log('BackUp Manual Finish // User: ' + format.asString('le dd/MM/yyyy à hh:mm:ss', new Date() ))
  })

}, null, true, 'Europe/Paris');
