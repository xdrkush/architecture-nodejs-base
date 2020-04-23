// Backup
var backup = require('mongodb-backup'),
  urlDb = 'mongodb://localhost:27017/apiRest',
  Cron = require('cron').CronJob;

// Tache cron
new Cron('1 * * * * *', () => {
  console.log('BackUp Auto toute les 1 minutes');

  // BackUp MongoDB
  backup({
    uri: urlDb,
    root: './BackUp/backUpAuto/backup-' + Date(),
    // collections: ['articles', 'users'],
    // tar: 'dump.tar',
    callback: function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('finish');
      }
    }
  });


}, null, true, 'America/Los_Angeles');
