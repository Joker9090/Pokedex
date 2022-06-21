/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('DetailView', () => {
  it('Detail Page should have bulbasaur information', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/bulbasaur')

    cy.get('[data-cy-test="cy-PropertyItem-Name"]').contains('bulbasaur');
      
  })

})
