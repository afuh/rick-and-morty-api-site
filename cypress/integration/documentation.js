import config from '../../config/siteConfig'

const externalLinks = [
  'https://github.com/spielhoelle/rick-and-morty-gem',
  'https://github.com/l1h3r/ex_shla',
  'https://github.com/curiousrohan/ramapi',
  'https://github.com/Carlj28/RickAndMorty.Net.Api',
  'https://github.com/pitakill/rickandmortyapigowrapper',
  'https://github.com/MikeJohnPage/mortyr',
  'https://github.com/adrianoluis/rickandmortyapi-java',
  'https://github.com/benjaminbruch/rick-morty-swift-api',
  'https://github.com/dshomoye/rick-and-morty',
  'https://github.com/bigdummyhead/rick.net',
  'https://github.com/loopDelicious/rick-and-morty-postman',
  'https://github.com/Yash-Garg/RickandMorty-Dart-Wrapper',
  'https://github.com/afuh/rick-and-morty-api-node',
  'https://javascript.rickandmortyapi.com',
  'https://github.com/nickbeen/rick-and-morty-api-php',
]

describe('Documentation page', () => {
  before(() => {
    cy.visit('/documentation')
  })

  describe('Layout', () => {
    it('contains a header and a footer', () => {
      cy.get('header').should('exist')
      cy.get('footer').should('exist')
    })
  })

  describe('Sidebar', () => {
    it('Should hide according to the viewport size', () => {
      cy.get('#nav-desktop').should('be.visible')
      cy.viewport('iphone-x')
      cy.get('#nav-desktop').should('not.be.visible')
    })

    it('Should be able to hide/show by clicking a button', () => {
      const navID = '#nav-mobile'

      cy.viewport('iphone-x')
      cy.get(`${navID} button`).should('be.visible')
      cy.get(`${navID} nav`).should('not.be.visible')
      cy.get(`${navID} button`).click()
      cy.get(`${navID} nav`).should('be.visible')
      cy.get(`${navID} nav`).within(() => {
        cy.findByText('Character').click()
      })
      cy.get(`${navID} nav`).should('not.be.visible')
    })
  })

  describe('Github edit page button', () => {
    it('Should be a link to edit the page', () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github.site + '/blob/master/src/pages/documentation.mdx')
    })
  })

  describe('External links. ', () => {
    externalLinks.forEach((item) => {
      const name = item.split('/').pop()

      it(name, () => {
        cy.get('main').within(() => {
          cy.get(`a[href='${item}']`)
            .request(item)
            .then((res) => expect(res.status).to.eq(200))
        })
      })
    })
  })
})
