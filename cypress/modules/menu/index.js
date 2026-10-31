const seletores = {
  bannerHome: '#slider',
  linkLoginCadastro: '.shop-menu a[href="/login"]',
  linkProdutos: '.shop-menu a[href="/products"]',
  linkCarrinho: '.shop-menu a[href="/view_cart"]',
  linkLogout: '.shop-menu a[href="/logout"]',
  usuarioLogado: '.shop-menu a b'
}

function acessarHome() {
  cy.visit('/')
}

function validarHomeVisivel() {
  cy.get(seletores.bannerHome).should('be.visible')
}

function acessarLoginCadastro() {
  cy.get(seletores.linkLoginCadastro).click()
}

function acessarProdutos() {
  cy.get(seletores.linkProdutos).click()
}

function acessarCarrinho() {
  cy.get(seletores.linkCarrinho).click()
}

function efetuarLogout() {
  cy.get(seletores.linkLogout).click()
}

function validarUsuarioLogado(nome) {
  cy.get(seletores.usuarioLogado)
    .should('be.visible')
    .and('have.text', nome)
}

module.exports = {
  acessarHome,
  validarHomeVisivel,
  acessarLoginCadastro,
  acessarProdutos,
  acessarCarrinho,
  efetuarLogout,
  validarUsuarioLogado
}
