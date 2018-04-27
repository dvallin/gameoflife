# Game Of Life
TDD exercise with Conways Game Of Life. This repository features a very basic Typescript + Jest + Webpack setup.

## Installation
You will need node and yarn

Try `brew install node` or `apt-get install node`. For yarn you want `npm install --global yarn` (or use your package manager)

Then in the project root you can run `yarn` to download and install all dependencies and build the project with `yarn build`.

## Working with the Repository
To do the tasks in `./test/game-of-life.spec.ts` you might want to open the project in VSCode and start an interactive jest session using `yarn unit:watch`. Your tests will now watch for file changes and retrigger automatically.

## Beyond the basic Game Of Life rules
Once you are done with the basics there are a lot of things that you might try to do.
1. Buttons to Reset, Start, Stop the simulation
2. Choosing from some preset initial states
3. Other Topologies for the Cellular Automaton
4. Other Rules
5. Drawing directly into the canvas
