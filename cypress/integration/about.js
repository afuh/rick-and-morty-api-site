import config from '../../config/siteConfig'

context('About page', () => {
  before(() => {
    cy.visit('/about')
  })

  describe('Layout', () => {
    it('contains a header and a footer', () => {
      cy.get('header').should('exist')
      cy.get('footer').should('exist')
    })
  })

  describe('Headings', () => {
    it('Should have several questions', () => {
      cy.get('main').within(() => {
        cy.findByText('What is this?').should('exist')
        cy.findByText('Who are you?').should('exist')
        cy.findByText('Why did you build this?').should('exist')
        cy.findByText('Technical stuff?').should('exist')
        cy.findByText('How can I contribute to the project?').should('exist')
        cy.findByText('Copyright?').should('exist')
      })
    })
  })

  describe('Links', () => {
    it('Should navigate', () => {
      cy.get('main').within(() => {
        cy.findByText('Check out the documentation to get started').should('have.attr', 'href', '/documentation')
        cy.findByText('Axel Fuhrmann').should('have.attr', 'href', config.author.site)
        cy.findByText('Talita').should('have.attr', 'href', 'https://talitatraveler.com')
        cy.findByText('GitHub').should('have.attr', 'href', config.github.api)
        cy.findByText('help us to keep the project alive').should('have.attr', 'href', '/support-us')
      })
    })
  })

  describe('Github edit page button', () => {
    it('Should be a link to edit the page', () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github.site + '/blob/master/src/pages/about.mdx')
    })
  })
})
