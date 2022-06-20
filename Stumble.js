const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

const GoStumble = (auth) => new Promise((resolve, reject) => {

    fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/1', {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
ＳＴＵＭＢＬＥ   ＨＡＣＫ V2

By : ${chalk.blue('@ArjunaGimank')}  ${chalk.blue('')}
`);

    const auth = rs.question('[+] Auth Token : ');
    console.log('');

    while (true) {

        const result = await GoStumble(auth);
        if (!result) {

            console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] [401] Wrong Token or Expired Token !`));
            break;

        } else if (result.includes('User')) {

            const data = JSON.parse(result);
            const username = data.User.Username;
            const country = data.User.Country;
            const trophy = data.User.SkillRating;
            const crown = data.User.Crowns
            console.log(chalk.blue(`\r[ ${moment().format('HH:mm:ss')} ] Sukses! | Nama : ${username} | Negara : ${country} | ${chalk.blue(`Piala : ${trophy}`)} | ${chalk.blue(`Mahkota: ${crown}`)}`));
            
        } else if (result == 'BANNED') {
            console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Akun Kamu Telah Di Banned `));
            break;
            
            } else if (result == 'SERVER_ERROR') {

                 continue;
                 
        }
    }
    

})();
