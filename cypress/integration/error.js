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

  describe('404 Message and image', () => {
    it('Should contains an error message with an image and a link to home page', () => {
      cy.get('main').within(() => {
        cy.findByText('404').should('exist')
        cy.findByText('Oh Jeez! there is nothing here.').should('exist')
        cy.get('img').should('exist')
        cy.get('a').should('have.attr', 'href', '/')
      })
    })
  })
})
