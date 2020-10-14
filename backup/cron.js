// Import Module
const cron = require('node-cron'),
    spawn = require('child_process').spawn;

// node-cron: https://www.npmjs.com/package/node-cron
// child-process: https://nodejs.org/api/child_process.html

let dbBackupTask = cron.schedule('* * * * *', () => {

    // La commande shell
    let backupProcess = spawn('mongodump', [
        '--db=apiRest',
        '--archive=./backup_apiRest',
        '--gzip'
    ]);

    // La sortie de notre commande
    backupProcess.on('exit', (code, signal) => {
        if (code)
            console.log('Backup process exited with code ', code);
        else if (signal)
            console.error('Backup process was killed with sigal ', signal);
        else
            console.log('Successfully backup the database')
    });

});