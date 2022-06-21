/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('MainList', () => {
  it('list should have 1126 pokemons', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('[data-cy-test="cy-PokemonsList"] > li').should(($l) => {
      expect($l).to.have.length(1126);
    });

  })

  it('filter for bulbasaur finds only one', () => {
    cy.get('[data-cy-test="cy-PokemonFilterQuery-input"]').type('bulbasaur');
    cy.get('[data-cy-test="cy-PokemonsList"] > li').should(($l) => {
      expect($l).to.have.length(1);
    });
  })

  it('click in bulbasaur goes to detail-view', () => {
    cy.get('[data-cy-test="cy-PokemonsList"] > li').click()
    cy.url().should('eq', 'http://localhost:3000/bulbasaur')
  })

  it('click in back goes to list', () => {
    cy.get('[data-cy-test="cy-PokemonDetailContent-back"]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  });

  it('click in create goes to create', () => {
    cy.get('[data-cy-test="cy-PokemonsAddLocalBtn-create"]').click()
    cy.url().should('eq', 'http://localhost:3000/create')
  });

})
