import config from '../../config/siteConfig'

const libraries = [
  { link: 'https://github.com/arthurdenner/rick-and-morty-graphql-api', author: 'https://github.com/arthurdenner' },
  { link: 'https://github.com/spielhoelle/rick-and-morty-gem', author: 'https://github.com/spielhoelle' },
  { link: 'https://github.com/l1h3r/ex_shla', author: 'https://github.com/l1h3r' },
  { link: 'https://github.com/afuh/rick-and-morty-api-node', author: 'https://github.com/afuh' },
  { link: 'https://github.com/curiousrohan/ramapi', author: 'https://github.com/curiousrohan' },
  { link: 'https://github.com/Carlj28/RickAndMorty.Net.Api', author: 'https://github.com/Carlj28' },
  { link: 'https://github.com/pitakill/rickandmortyapigowrapper', author: 'https://github.com/pitakill' },
  { link: 'https://github.com/MikeJohnPage/mortyr', author: 'https://github.com/MikeJohnPage' }
]

describe('Documentation page', () => {
  before(() => {
    cy.visit('/documentation')

    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for (const registration of registrations) {
          registration.unregister()
        }
      })

    cy.scrollTo('top')
  })

  describe('Sidebar', () => {
    it('Should hide according to the viewport size', () => {
      cy.get('aside').should('be.visible')
      cy.viewport('iphone-5')
      cy.get('aside').should('not.be.visible')
    })

    it('Should become be able to hide/show when the toggle button', () => {
      cy.viewport('iphone-5')
      cy.get('#nav-mobile button').should('be.visible')
      cy.get('#nav-mobile nav').should('not.be.visible')
      cy.get('#nav-mobile button').click()
      cy.get('#nav-mobile nav').should('be.visible')
    })

    it('Should become a sticky sidebar when scrolling', () => {
      cy.get('#nav-desktop nav').should('have.css', 'position').and('eq', 'relative')
      cy.scrollTo('center')
      cy.get('#nav-desktop nav').should('have.css', 'position').and('eq', 'fixed')
    })

    it('Should become a scrolleable sidebar', () => {
      cy.viewport(1200, 600)
      cy.scrollTo('bottom')
      cy.get('#nav-desktop nav').scrollTo('bottom')
      cy.get('#nav-desktop nav').scrollTo('top')
    })

  })

  describe('Github edit page button', () => {
    it('Should be a link to edit the page', () => {
      cy.get('a.edit-page')
        .should(
          'have.attr',
          'href',
          config.github.site + '/blob/develop/src/pages/documentation.md'
        )
    })
  })

  describe('Libraries section, each one should have a title and two working links', () => {
    libraries.forEach(library => {
      const name = library.link.split('/').pop()
      it(name, () => {
        cy.get('main').within(() => {
          cy.get(`a[href='${library.link}']`)
            .request(library.link)
            .then(res => expect(res.status).not.to.eq(400))

          cy.get(`a[href='${library.author}']`)
            .request(library.author)
            .then(res => expect(res.status).not.to.eq(400))

        })
      })
    })
  })
})
