/* global it describe cy before expect*/
import config from '../../config/SiteConfig';
const YAML = require('yamljs')

describe("Home page", () => {
  before(() => cy.visit('/'))

  describe('Header', () => {
    it("Should navigate thorough the site", () => {
      cy.get('header').within(() => {

        cy.get('a[title="GitHub"]').should('have.attr', 'href', config.githubAPI)

        cy.get('a').contains('About').click()
        cy.url().should('include', '/about')
        cy.get('a').contains('Documentation').click()
        cy.url().should('include', '/documentation')
        cy.get('a').contains('Home').click()
        cy.url().should('include', '/')
      })
    });
  })

  describe('Main', () => {
    it('Should contains a title and a subtitle', () => {
      cy.get('main').within(() => {
        cy.get('h1').contains(config.siteTitle)
        cy.get('h2').contains(config.siteDescription)
      })
    })

    it('Should show 8 cards', () => {
      cy.get('main section').within(() => {
        cy.get('article').should('be.length', 8)
      })
    })

    it('Each card should have an image and not be larger than 300x300', () => {
      cy.get('main section article').within(() => {
        cy.get('img').each(el => {
          const { src, height, width } = el.context
          expect(src).to.include('/api/character/avatar')
          expect(height).to.be.lte(300)
          expect(width).to.be.lte(300)
        })
      })
    })

    it('Each card should a title and subtitle', () => {
      cy.get('main section article').within(() => {
        cy.get("div.card-title").each(el => {
          const { children } = el.context
          expect(children).to.have.lengthOf(2)
        })
      })
    })

    it('Each card should have an info section of 5 elements', () => {
      cy.get('main section article').within(() => {
        cy.get("div.card-info").each(el => {
          const { children } = el.context
          expect(children).to.have.lengthOf(5)
        })

      })
    })
  })

  describe('Footer', () => {
    it('Should contains statistic info and a link ', () => {
      cy.get('footer').within(() => {

        cy.readFile('/src/data/statistics.yaml')
          .then(stats => {
             YAML.parse(stats).map(stat => {
              cy.get('span').contains(`${stat.title.toUpperCase()}: ${stat.count}`)
            })
          })

        cy.get('a')
          .contains('Axel Fuhrmann')
          .should('have.attr', 'href', "http://axelfuhrmann.com/")
      })
    })
  })



});
