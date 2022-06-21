This is a Pokedex Challenge
( Barto's Solution )

## Demo link 
[Demo](https://pokedex-beryl-nine.vercel.app/)


## Concept Diagram
![DiagramImage](https://github.com/Joker9090/Pokedex/blob/main/public/images/diagram.png?raw=true)

## Stack
- node 16.13.1
- Next
- React
- Redux
- Typescript
- Cypress
- styled
- Docker
- iconmoon

## linter
There is a eslinter config for a pretty code =)

## requirements
- Docker
- nvm
- yarn

## Testing
![TestImage](https://github.com/Joker9090/Pokedex/blob/main/public/images/tests.png?raw=true)
There is a Cypress implementation
the test files are located in cypress/integration folder

```js
  "cypress": "cypress open",
  "cypress:headless": "cypress run",
  "e2e": "start-server-and-test dev http://localhost:3000 cypress",
  "e2e:headless": "start-server-and-test dev http://localhost:3000 cypress:headless"
```

## Getting Started
First, run the development server:
[requirements ( at least one ), NVM || YARN || DOCKER ]
```js
  nvm use  
  npm install
  npm run dev
  # or
  yarn dev
  # or
  make start
  # or
  docker-compose up -d --build
```

## Configure Env File
Create a local .env file with the following variables
```
NEXT_PUBLIC_API_URI=
NEXT_PUBLIC_IMAGES_URI=
```

## TO IMPROVE
- improve typecript validation in root Reducer when actions.payload is readed
- Props Drillin in FilterObject
- scss instead of basic css for better in-box-css
- more test cases
- remove All local feature
- Save Local Data in session Storage
- shimmers on loading
- infinite scroll or pagination
- form validations in create


## Learn More
- Time-Spent = 16 hours
- Time-Spent-pretends = 12 hours
