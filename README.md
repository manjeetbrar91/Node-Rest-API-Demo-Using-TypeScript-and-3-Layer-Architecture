Prerequisites:
Node 8+ with npm
Globally installed nodemon (npm i -g nodemon)

How to start:

- Clone repo
- cd into project
- npm i
- npm start

Scripts:
npm run dev : Runs server in dev mode using ts-node
npm run prod : Starts a server with code in dist folder(typically run after `npm run build` if used independently)
npm run build : Uses the typescript compiler to transpile and build typescript into javascript and stores built application in dist folder
npm start : Builds and run server in prod mode
