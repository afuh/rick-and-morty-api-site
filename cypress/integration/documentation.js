/* global it describe cy before*/
import config from '../../config/SiteConfig';
const YAML = require('yamljs')

describe("Documentation page", () => {
  before(() => cy.visit('/documentation'))

  describe("Sidebar", () => {
    it("Should hide according to the viewport size", () => {
      cy.get('aside').should('be.visible')

      cy.viewport(890, 900)
      cy.get('aside').should('not.be.visible')
      cy.wait(500)
      cy.viewport('iphone-5')
      cy.get('aside').should('not.be.visible')
      cy.wait(500)

    })

    it("Should become a sticky sidebar when scrolling", () => {
      cy.get('aside').should('have.css', 'position').and('match', /relative/)
      cy.scrollTo('center')
      cy.get('aside').should('have.css', 'position').and('match', /fixed/)
    })

    it("Should be an index with Headers and links", () => {
      cy.readFile('/src/data/docs-index.yaml')
        .then(index => {
          YAML.parse(index).map(wrapper => {
            cy.get('aside h3').contains(wrapper.title)
            console.log(wrapper);

            wrapper.items.map(anchor => {
              cy.get('aside li a')
                .contains(anchor.title)
                .and('have.attr', 'href', '/documentation' + anchor.link)
                .click()
              cy.url().should('include', anchor.link)
            })

          })
        })
      })

  })

  describe('Page edit', () => {
    it("Should be a link to edit the page", () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github + '/blob/master/src/pages/documentation.md')
    })
  })

})
