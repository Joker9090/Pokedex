/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('CreateView', () => {
  it('Create Page should have empty information', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/create')
    cy.get('[data-cy-test="cy-PropertyItemCreateName"]').clear().type("pokemon-01").should('have.value', 'pokemon-01');
  });

  it('click add sections should create new items', () => {
    cy.get('[data-cy-test="cy-PropertyItemCreateStatsList-add"]').click()
    cy.get('[data-cy-test="cy-PropertyItemCreateList-Abilities-add"]').click()
    cy.get('[data-cy-test="cy-PropertyItemCreateList-Types-add"]').click()
  });
  
  it('click in create goes to list', () => {
    cy.get('[data-cy-test="cy-PokemonsAddLocalBtnConnected-create"]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  });

  it('filter for pokemon-01 finds only one', () => {
    cy.get('[data-cy-test="cy-PokemonFilterQuery-input"]').clear().type('pokemon-01');
    cy.get('[data-cy-test="cy-PokemonsList"] > li').should(($l) => {
      expect($l).to.have.length(1);
    });
  })

  it('click in pokemon-01 goes to detail-view', () => {
    cy.get('[data-cy-test="cy-PokemonsList"] > li').click()
    cy.url().should('eq', 'http://localhost:3000/pokemon-01')
  })

  it('click in remove goes to list', () => {
    cy.get('[data-cy-test="cy-PokemonsAddLocalBtnConnected-create"]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  });

  it('filter for pokemon-01 finds nothing', () => {
    cy.get('[data-cy-test="cy-PokemonFilterQuery-input"]').clear().type('pokemon-01');
    cy.get('[data-cy-test="cy-PokemonsList"] > li').should(($l) => {
      expect($l).to.have.length(0);
    });
  })

})
