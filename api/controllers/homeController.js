const Cron = require('cron').CronJob

module.exports = {
  get: (req, res) => {
    //   Tache qui ce répète toute les second
    var jobSecond = new Cron('* * * * * *', () => {
        const d = Date()
        console.log('Cette tache ce répète toute les seconds');
        // America/Los_Angeles est le fuseau horaire
      }, null, true, 'America/Los_Angeles');
    jobSecond.start();

    //   Tache qui ce répète tout les 10s
    // 1 minute / 10
    var job10Second = new Cron('*/10 * * * * *', () => {
        console.log('Cette tache ce répète toute les 10 second');
      }, null, true, 'America/Los_Angeles');
    job10Second.start();

    //   Tache qui ce répète toute les minutes
    var jobMinute = new Cron('1 * * * * *', () => {
        console.log('Cette tache ce répète toute les minutes');
      }, null, true, 'America/Los_Angeles');
    jobMinute.start();

    //   Tache qui ce répète toute les heures
    var jobHour = new Cron('* 1 * * * *', () => {
        console.log('Cette tache ce répète toute les heures');
      }, null, true, 'America/Los_Angeles');
    jobHour.start();

    //   Tache qui ce répète tous les 20 du mois
    var jobMonth = new Cron('* * 20 * * *', () => {
        console.log('Cette tache ce répète tous les 20 du mois');
      }, null, true, 'America/Los_Angeles');
    jobMonth.start();

    //   Tache qui ce répète toute les mardi (2em jour de la semaine)
    var jobThursday = new Cron('* * * * 2 *', () => {
        console.log('Cette tache ce répète tous les mardi');
      }, null, true, 'America/Los_Angeles');
    jobThursday.start();

    //   Tache qui ce répète tout les jours voulu
    var jobThursday = new Cron('* 2 14 20 4 *', () => {
        console.log('Bonne anniversaire Drk');
      }, null, true, 'America/Los_Angeles');
    jobThursday.start();

    res.render('home')
  },
  post: (req, res) => {
    console.log('coucou')
  }
}