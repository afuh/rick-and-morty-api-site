context('Error page', () => {
  before(() => {
    cy.visit('/plumbus', { failOnStatusCode: false })
  })

  describe('Layout', () => {
    it('contains a header and a footer', () => {
      cy.get('header').should('exist')
      cy.get('footer').should('exist')
    })
  })

  describe('404 text', () => {
    it('Should contains a huge 404', () => {
      cy.get('main').within(() => {
        cy.findByText('404').should('exist')
      })
    })
  })
})
