/* global it describe cy before expect*/
import config from '../../config/SiteConfig';
const YAML = require('yamljs')

const libraries = [
  { id: 'GraphQL', link: 'https://github.com/arthurdenner/rick-and-morty-graphql-api', author: 'https://github.com/arthurdenner' },
  { id: 'Ruby', link: 'https://github.com/spielhoelle/rick-and-morty-gem', author: 'https://github.com/spielhoelle' },
  { id: 'Elixir', link: 'https://github.com/l1h3r/ex_shla', author: 'https://github.com/l1h3r' }
]

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

    it("Should become a scrolleable sidebar", () => {
      cy.viewport(1200, 600)
      cy.scrollTo('bottom')
      cy.get('aside').scrollTo('bottom')
      cy.wait(500)
      cy.get('aside').scrollTo('top')
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

  describe('Libraries section', () => {
    it("Should have a Title and two working links", () => {
      for (const key in libraries) {
        cy.get('article').within(() => {
          cy.get('h4').contains(libraries[key].id)

          cy.get(`a[href='${libraries[key].link}']`)
          cy.request(libraries[key].link).then(res => expect(res.status).not.to.eq(400))

          cy.get(`a[href='${libraries[key].author}']`)
          cy.request(libraries[key].author).then(res => expect(res.status).not.to.eq(400))

        })
      }
    })
  })

  describe('Github edit page button', () => {
    it("Should be a link to edit the page", () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github + '/blob/develop/src/pages/documentation.md')
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
