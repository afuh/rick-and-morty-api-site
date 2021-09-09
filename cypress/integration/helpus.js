import config from '../../config/siteConfig'

context('Help Us page', () => {
  before(() => {
    cy.visit('/help-us')
  })

  describe('Layout', () => {
    it('contains a header and a footer', () => {
      cy.get('header').should('exist')
      cy.get('footer').should('exist')
    })
  })

  describe('Content', () => {
    it('Should have a title and a working donate button', () => {
      cy.get('main').within(() => {
        cy.findByText('Support The Rick and Morty API').should('exist')
        cy.findByAltText('Buy Me A Coffee')
          .parent()
          .should('have.attr', 'href', config.support.coffee)
          .request(config.support.coffee)
          .then((res) => expect(res.status).to.eq(200))
      })
    })
  })

  describe('Github edit page button', () => {
    it('Should be a link to edit the page', () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github.site + '/blob/master/src/pages/help-us/index.mdx')

      cy.visit('/help-us/thank-you')

      cy.get('a.edit-page').should(
        'have.attr',
        'href',
        config.github.site + '/blob/master/src/pages/help-us/thank-you.mdx',
      )
    })
  })

  describe('Thank you page', () => {
    it('Should have a thank you sub page with a text and image', () => {
      cy.visit('/help-us/thank-you')

      cy.get('main').within(() => {
        cy.findByText('Thank you!').should('exist')
        cy.get('img').then(($el) => {
          Cypress.dom.isVisible($el)
        })
      })
    })
  })
})
