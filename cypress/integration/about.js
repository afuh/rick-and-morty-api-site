import config from '../../config/siteConfig'

describe('About page', () => {
  before(() => {
    cy.visit('/about')

    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for (const registration of registrations) {
          registration.unregister()
        }
      })

    cy.scrollTo('top')
  })

  describe('Headings', () => {
    it('Should be h3 questions', () => {
      cy.get('main').within(() => {
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
    it('Should navigate', () => {
      cy.get('a').contains('Check out the documentation to get started').click({ force: true })
      cy.url().should('include', '/documentation')
      cy.get('a').contains('About').click({ force: true })

      cy.get('a').contains('Axel Fuhrmann').should('have.attr', 'href', config.author.site)
      cy.get('a').contains('Talita').should('have.attr', 'href', 'https://talitatraveler.com')
      cy.get('a').contains('PR').should('have.attr', 'href', config.github.site)
      cy.get('a').contains('GitHub').should('have.attr', 'href', config.github.api)
      cy.get('a').contains('email').should('have.attr', 'href', 'mailto:axelfuh@gmail.com')
    })
  })

  describe('Github edit page button', () => {
    it('Should be a link to edit the page', () => {
      cy.get('a.edit-page')
        .should('have.attr', 'href', config.github.site + '/blob/develop/src/pages/about.md')
    })
  })
})
