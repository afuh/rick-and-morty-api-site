/* global it describe cy before expect*/
import config from "../../config/siteConfig"

describe("Home page", () => {
  before(() => {
    cy.visit('/')

    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for (let registration of registrations) {
          registration.unregister()
        }
      })

    cy.scrollTo('top')
  })

  describe('Header', () => {
    it("Should navigate thorough the site", () => {

      cy.get('nav a[title="GitHub"]').should('have.attr', 'href', config.github.api)

      cy.get('nav').contains('About').click({ force: true })
      cy.url().should('include', '/about')

      cy.get('nav').contains('Documentation').click({ force: true })
      cy.url().should('include', '/documentation')

      cy.get('nav').contains('Home').click({ force: true })
      cy.url().should('include', '/')
    })

    it("Should not be a github icon in mobile view", () => {
      cy.get('header').within(() => {
        cy.viewport('iphone-4')
        cy.get('a[title="GitHub"]').should('not.be.visible')
        cy.wait(500)

      })
    })
  })

  describe('Main', () => {
    it('Should contains a title and a subtitle', () => {
      cy.get('main').within(() => {
        cy.get('h1').contains(config.title)
        cy.get('h2').contains(config.description)
      })
    })

    it('Should show 8 cards', () => {
      cy.get('main section').within(() => {
        cy.get('article').should('be.length', 8)
      })
    })

    it('Each card should have an image and not be larger than 300x300', () => {
      cy.get('[data="card header"]').within(() => {
        cy.get('img').each(el => {
          const { src, height, width } = el.context
          expect(src).to.include('/api/character/avatar')
          expect(height).to.be.lte(300)
          expect(width).to.be.lte(300)
        })
      })
    })

    it('Each card should a title and subtitle', () => {
      cy.get('[data="card header"]').each(el => {
        const { children } = el.context
        expect(children).to.have.lengthOf(2)
      })
    })

    it('Each card should have a STATUS section', () => {
      cy.get('[data="card info"]').each(() => {
        cy.get('span').contains('STATUS')
      })
    })

    it('Each card should have a SPECIES section', () => {
      cy.get('[data="card info"]').each(() => {
        cy.get('span').contains('SPECIES')
      })
    })

    it('Each card should have a GENDER section', () => {
      cy.get('[data="card info"]').each(() => {
        cy.get('span').contains('GENDER')
      })
    })

    it('Each card should have a ORIGIN section', () => {
      cy.get('[data="card info"]').each(() => {
        cy.get('span').contains('ORIGIN')
      })
    })

    it('Each card should have a LAST LOCATION section', () => {
      cy.get('[data="card info"]').each(() => {
        cy.get('span').contains('LAST LOCATION')
      })
    })

  })

  describe('Footer', () => {
    it('Should contains statistic info and a link ', () => {
      const col = ['characters', 'locations', 'episodes']

      cy.scrollTo('bottom')
      cy.get('footer').within(() => {

        col.map(c => {
          cy.get('span').contains(c.toUpperCase())
        })

        cy.get('a')
          .contains(config.author.name)
          .should('have.attr', 'href', config.author.site)

        cy.request(config.author.site).then(res => expect(res.status).not.to.eq(400))
      })
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
