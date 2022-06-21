This is a Pokedex Challenge
( Barto's Solution )

## Demo link 
[Demo]

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

## Docker config
(pending)

## requirements
- Docker (pending)
- nvm
- yarn

## Testing
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
- INPROVE typecript validation in root Reducer when actions.payload is readed
- Props Drillin in FilterObject
- scss instead of basic css for better in-box-css
- more test cases
- remove All local feature
- Save Local Data in session Storage
- shimmers on loading
- infinite scroll or pagination

## Learn More

- Time-Spent = 14 hours
- Time-Spent-pretends = 12 hours
