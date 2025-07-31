# UI Assessment - Pokédex (Senior)

Requirements for this can be found on the home page of the app or [here](./src/README.md)

## To run:

Make sure you have node verson 16 or higher installed
yarn install
yarn run dev

or you can use the docker container but you gotta make sure you have that installed already, i just wanted y'all to know I can do very basic devops
docker build -t pokedex-app .
docker run -p 8080:80 pokedex-app

TODO: There's some wonky dependencies with types - can only run dev environment until resoved