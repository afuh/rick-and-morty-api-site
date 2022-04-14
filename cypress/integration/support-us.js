import config from '../../config/siteConfig'

context('Support Us page', () => {
  before(() => {
    cy.visit('/support-us')
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
        cy.findByAltText('Buy Me A Coffee - Ko-fi').parent().should('have.attr', 'href', config.support.kofi)
        cy.findByAltText('Buy Me A Coffee').parent().should('have.attr', 'href', config.support.buyMeACoffee)
      })
    })
  })

  describe('Github edit page button', () => {
    it('Should be a link to edit the page', () => {
      cy.get('a.edit-page').should(
        'have.attr',
        'href',
        config.github.site + '/blob/master/src/pages/support-us/index.mdx',
      )
    })
  })
})
