// Backup
var backup = require('mongodb-backup'),
  urlDb = 'mongodb://localhost:27017/apiRest',
  format = require('date-format'),
  Cron = require('cron').CronJob;

// Tache cron
new Cron('1 * * * * *', () => {
  console.log('BackUp Auto toute les 1 minutes');

  // BackUp MongoDB
  backup({
    uri: urlDb,
    root: './BackUp/backUpAuto/backup-' + format.asString('dd-MM-yyyy_hh:mm:ss', new Date()),
    collections: ['articles', 'users'],
    tar: 'backup' + format.asString('dd-MM-yyyy_hh:mm:ss', new Date()) + '.tar',
    callback: function(err) {
      if (err) console.error(err)
      else console.log('BackUp Auto Finish: ' + format.asString('le dd-MM-yyyy à hh:mm:ss', new Date() ))
    }
  });


}, null, true, 'Europe/Paris');

