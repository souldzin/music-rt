const {exec} = require('child_process');

function run(cmd, args) {
    return new Promise(function(resolve, reject){
        console.log(`exec: ` + cmd);

        const proc = exec(cmd);

        proc.stdout.on('data', (data) => {
            console.log(data.toString("utf-8"));
        });

        proc.stderr.on('data', (data) => {
            console.log(data);
        });

        proc.on('error', (data) => {
            console.log(data);
            reject(data);
        })

        proc.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(code);
        });
    });
}

module.exports = run;