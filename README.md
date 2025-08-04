# UI Assessment - Pokédex (Senior)

Requirements for this can be found on the home page of the app or [here](./src/README.md)

## Notes from Renée

While I could occasionally connect here: https://graphql-pokemon2.vercel.app/ Most the time it was down, so I found another api to use (https://graphql-pokeapi.vercel.app/api/graphql). I didn't include the pokemon types in the list display because unlike the schema of https://graphql-pokemon2.vercel.app/. The API I used is...pretty slow (especially the details one), but I figured for the purposes of the exercise, it would do. I tried to mitigate the slowness by adding dancing pokemon and doing a prefetch. I'm a little rusty with both react and graphql but it's come back pretty quickly. I try to follow good ol Uncle Bob's advice by first making it work, then making it right, then making it fast. For my own satistfaction, I'm going to continue working on this. You can find my continued work in the other branch on this repo.

## To run:

yarn install

yarn run dev

### Or use docker:

docker build -t pokedex-app .

docker run -p 8080:80 pokedex-app
