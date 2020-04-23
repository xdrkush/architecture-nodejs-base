// Backup
var urlDb = 'mongodb://localhost:27017/apiRest',
  fs = require('fs'),
  Article = require('../../api/database/Article'),
  Cron = require('cron').CronJob;

// Tache cron
new Cron('1 * * * * *', async () => {
  console.log('BackUp Manual toute les 1 minutes');

  // Articles
  const dbArticle = await Article.find({})
  let dataArticle = JSON.stringify(dbArticle, null, 2)

  fs.writeFile('./BackUp/backUpManual/Article/backArticle-' + Date() + '.json', dataArticle, (err) => {
    if(err) console.log(err)
    else console.log('Fichier Json Créé')
  })

}, null, true, 'America/Los_Angeles');
