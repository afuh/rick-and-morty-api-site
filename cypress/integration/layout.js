import config from '../../config/siteConfig'

context('Layout', () => {
  before(() => {
    cy.visit('/')
  })

  describe('Header', () => {
    it('Should contains several links', () => {
      cy.get('header').within(() => {
        cy.findByText('About').should('have.attr', 'href', '/about')
        cy.findByText('Documentation').should('have.attr', 'href', '/documentation')
        cy.findByText('help us').parent().should('have.attr', 'href', '/help-us')

        cy.viewport('iphone-x')
        cy.get('span.mobile').should('not.have.text', 'help-us')
      })
    })
  })

  describe('Footer', () => {
    it('Should contains statistic info, server status and several links ', () => {
      const statistic = ['characters', 'locations', 'episodes']
      const twitterUrl = 'https://twitter.com/' + config.userTwitter

      cy.get('footer').within(() => {
        statistic.forEach((collection) => {
          cy.get('span').contains(collection)
        })

        cy.findByTitle('GitHub').should('have.attr', 'href', config.github.api)
        cy.findByTitle('Twitter').should('have.attr', 'href', twitterUrl)
        cy.findByText(config.author.name).should('have.attr', 'href', config.author.site)
        cy.findByTestId('server-status').should('have.attr', 'href', config.status.site)
        cy.findByTitle('Help Us').should('have.attr', 'href', '/help-us')
      })
    })
  })
})
