# music-rt

# Development Instructions

First, make sure you have the following installed:

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [yarn](https://yarnpkg.com/en/docs/install)

Then, after cloning this repository locally. Open a command prompt and `cd` into the project directory. Run `yarn install` to install the node package dependencies.

### Packages:

Inner packages are found in the `pkgs` directory.

- "experiment-tonejs-play": This package contains some experimentation with ToneJS
- "music-rt-fe": This package contains the front end of music-rt

### Commands:

- `yarn run js -- -d pkgs/music-rt-fe` to build the `app.bundle.js` for the music-rt-fe package. You can add the `-w` flag to watch files.