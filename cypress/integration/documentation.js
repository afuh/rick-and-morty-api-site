/* global it describe cy before*/
import config from '../../config/SiteConfig';
const YAML = require('yamljs')

describe("Documentation page", () => {
  before(() => {
    cy.visit('/documentation')

    navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        for(let registration of registrations) {
          registration.unregister()
        }
      })

    cy.scrollTo('top')
  })

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

            wrapper.items.map(anchor => {
              cy.get('aside li a')
                .contains(anchor.title).click()
              cy.url().should('include', anchor.link)
            })

          })
        })
      })

  })

  describe('Github edit page button', () => {
    it("Should be a link to edit the page", () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github + '/blob/master/src/pages/documentation.md')
    })
  })

  describe('Page', () => {
    it("Should work in differents viewports", () => {
      cy.scrollTo('top')
      cy.viewport('ipad-2')
      cy.wait(400)
      cy.viewport('ipad-mini')
      cy.wait(400)
      cy.viewport('iphone-6+')
      cy.wait(400)
      cy.viewport('iphone-6')
      cy.wait(400)
      cy.viewport('iphone-5')
      cy.wait(400)
      cy.viewport('iphone-4')
      cy.wait(400)
      cy.viewport('iphone-3')
      cy.wait(400)
    })
  })

})
