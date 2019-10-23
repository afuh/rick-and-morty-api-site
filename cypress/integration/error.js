describe("Error page", () => {
  before(() => {
    cy.visit('/asdf', { failOnStatusCode: false })

    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for (let registration of registrations) {
          registration.unregister()
        }
      })
  })

  describe("404 Message and image", () => {
    it("Should contains an error message with an image", () => {
      cy.get('main').within(() => {
        cy.get('p').contains('Oh Jeez! there is nothing here')
        cy.get('p').contains('But I could show you a cute picture of')
        cy.get('img').each(el => {
          const { src, height, width } = el.context
          expect(src).to.include('/api/character/avatar')
          expect(height).to.be.lte(300)
          expect(width).to.be.lte(300)
        })
      })
    })
  })

  describe("Go Back button", () => {
    it("Should navigate to the home page", () => {
      cy.get('main').within(() => {
        cy.get('a').should('have.attr', 'href', '/').click({ force: true })
        cy.url().should('include', '/')
      })
    })
  })


})
