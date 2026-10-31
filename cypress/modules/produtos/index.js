const seletores = {
  tituloSecao: '.features_items h2.title',
  cardsProdutos: '.features_items .product-image-wrapper',
  linkPrimeiroProduto: '.features_items a[href="/product_details/1"]',
  informacoesProduto: '.product-information',
  nomeProduto: '.product-information h2',
  campoPesquisa: '#search_product',
  botaoPesquisar: '#submit_search',
  botaoAdicionarCarrinho: '.features_items .productinfo .add-to-cart',
  modalCarrinho: '#cartModal',
  botaoContinuarComprando: '#cartModal .close-modal'
}

function validarTodosProdutosVisiveis() {
  cy.url().should('include', '/products')
  cy.get(seletores.tituloSecao).should('contain.text', 'All Products')
  cy.get(seletores.cardsProdutos)
    .should('have.length.greaterThan', 0)
    .first()
    .should('be.visible')
}

function acessarPrimeiroProduto() {
  cy.get(seletores.linkPrimeiroProduto).click()
}

function validarDetalhesDoProduto() {
  cy.url().should('include', '/product_details/1')
  cy.get(seletores.nomeProduto).should('be.visible')
  cy.get(seletores.informacoesProduto)
    .should('be.visible')
    .and('contain.text', 'Category:')
    .and('contain.text', 'Rs.')
    .and('contain.text', 'Availability:')
    .and('contain.text', 'Condition:')
    .and('contain.text', 'Brand:')
}

function pesquisarProduto(termo) {
  cy.get(seletores.campoPesquisa).type(termo)
  cy.get(seletores.botaoPesquisar).click()
}

function validarResultadoDaPesquisa() {
  cy.get(seletores.tituloSecao)
    .should('be.visible')
    .and('contain.text', 'Searched Products')
  cy.get(seletores.cardsProdutos)
    .should('have.length.greaterThan', 0)
    .each(($card) => {
      cy.wrap($card).should('be.visible')
    })
}

function adicionarProdutosAoCarrinho(idsProdutos) {
  idsProdutos.forEach((id) => {
    cy.get(`${seletores.botaoAdicionarCarrinho}[data-product-id="${id}"]`).click()
    cy.get(seletores.modalCarrinho)
      .should('be.visible')
      .and('contain.text', 'Added!')
    cy.get(seletores.botaoContinuarComprando).click()
    cy.get(seletores.modalCarrinho).should('not.be.visible')
  })
}

module.exports = {
  validarTodosProdutosVisiveis,
  acessarPrimeiroProduto,
  validarDetalhesDoProduto,
  pesquisarProduto,
  validarResultadoDaPesquisa,
  adicionarProdutosAoCarrinho
}
