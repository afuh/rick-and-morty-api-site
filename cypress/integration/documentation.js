import config from '../../config/siteConfig'

describe('Documentation page', () => {
  before(() => {
    cy.visit('/documentation')
  })

  describe('Layout', () => {
    it('contains a header and a footer', () => {
      cy.get('header').should('exist')
      cy.get('footer').should('exist')
    })
  })

  describe('Sidebar', () => {
    it('Should hide according to the viewport size', () => {
      cy.get('#nav-desktop').should('be.visible')
      cy.viewport('iphone-x')
      cy.get('#nav-desktop').should('not.be.visible')
    })

    it('Should be able to hide/show by clicking a button', () => {
      const navID = '#nav-mobile'

      cy.viewport('iphone-x')
      cy.get(`${navID} button`).should('be.visible')
      cy.get(`${navID} nav`).should('not.be.visible')
      cy.get(`${navID} button`).click()
      cy.get(`${navID} nav`).should('be.visible')
      cy.get(`${navID} nav`).within(() => {
        cy.findByText('Character').click()
      })
      cy.get(`${navID} nav`).should('not.be.visible')
    })
  })

  describe('Github edit page button', () => {
    it('Should be a link to edit the page', () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github.site + '/blob/master/src/pages/documentation.mdx')
    })
  })
})
