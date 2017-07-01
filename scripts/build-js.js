const run = require('./run');
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

const bundler = argv.watch ? "watchify" : "browserify";
const cmd = `${bundler} ${argv.directory}/src/app.js
-o ${argv.directory}/www/app.bundle.js
-t [ babelify --presets [ es2015 react ] ]
-p [ rememberify ]
-v`.replace(/\s+/g," ");

run(cmd);