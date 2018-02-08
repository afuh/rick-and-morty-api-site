/* global it describe cy before*/
import config from '../../config/SiteConfig';

describe("About page", () => {
  before(() => cy.visit('/about'))

  describe('Headers', () => {
    it("Should be h3 questions", () => {
      cy.get('article').within(() => {
        cy.get('h3').contains('What is this?')
        cy.get('h3').contains('Who are you?')
        cy.get('h3').contains('Did you build the API alone?')
        cy.get('h3').contains('Why did you build this?')
        cy.get('h3').contains('Are you a native english speaker?')
        cy.get('h3').contains('Technical stuff?')
        cy.get('h3').contains('Can I contribute to the project?')
        cy.get('h3').contains('Copyright?')
      })
    })
  })

  describe('Links', () => {
    it("Should navigate", () => {
      cy.get('a').contains('Check out the documentation to get started').click()
      cy.url().should('include', '/documentation')
      cy.get('a').contains('About').click()

      cy.get('a').contains('Axel Fuhrmann').should('have.attr', 'href', 'http://axelfuhrmann.com')
      cy.get('a').contains('Talita').should('have.attr', 'href', 'https://talitatraveler.wordpress.com/')
      cy.get('a').contains('PR').should('have.attr', 'href', config.github)
      cy.get('a').contains('GitHub').should('have.attr', 'href', config.githubAPI)
      cy.get('a').contains('email').should('have.attr', 'href', 'mailto:axelfuh@gmail.com')
    })
  })

  describe('Page edit', () => {
    it("Should be a link to edit the page", () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github + '/blob/master/src/pages/about.md')
    })
  })

})
