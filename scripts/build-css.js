const run = require('./run');
const fs = require('fs');
const argv = require('yargs')
    .option('directory', {
        alias: 'd',
        required: true
    })
    .option('watch', {
        alias: 'w',
        default: false
    })
    .argv;

const input = `${argv.directory}/styles/app.less`;
const output = `${argv.directory}/www/app.min.css`;

// can we read the file?
fs.access(input, fs.constants.R_OK, (e) => {
    if(e) {
        console.log("Stylesheet not found: " + input);
        console.log("Skipping css build.")    
        return;
    }

    const cmd = `lessc --clean-css ${input} ${output}`;
    run(cmd);
});
