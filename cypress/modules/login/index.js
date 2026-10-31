const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemErro: 'form[action="/login"] p'
}

function validarLoginVisivel() {
  cy.get(seletores.tituloLogin)
    .should('be.visible')
    .and('contain.text', 'Login to your account')
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
  cy.get(seletores.botaoEntrar).click()
}

function validarMensagemDeErroLogin() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('contain.text', 'Your email or password is incorrect!')
}

function validarRedirecionamentoParaLogin() {
  cy.url().should('include', '/login')
  validarLoginVisivel()
}

module.exports = {
  validarLoginVisivel,
  efetuarLogin,
  validarMensagemDeErroLogin,
  validarRedirecionamentoParaLogin
}
