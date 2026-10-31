const seletores = {
  tituloNovoCadastro: '.signup-form h2',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoCadastrar: '[data-qa="signup-button"]',
  tituloInformacoesConta: '.login-form h2',
  titulo: 'input[name="title"]',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  mensagemContaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
  mensagemErroCadastro: 'form[action="/signup"] p'
}

function validarNovoCadastroVisivel() {
  cy.get(seletores.tituloNovoCadastro)
    .should('be.visible')
    .and('contain.text', 'New User Signup!')
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.nome).type(nome)
  cy.get(seletores.email).type(email)
  cy.get(seletores.botaoCadastrar).click()
}

function validarInformacoesDaContaVisivel() {
  cy.get(seletores.tituloInformacoesConta)
    .first()
    .should('be.visible')
    .and('contain.text', 'Enter Account Information')
}

function preencherCadastro(usuario) {
  cy.get(`${seletores.titulo}[value="${usuario.titulo}"]`).check()
  cy.get(seletores.senha).type(usuario.senha)
  cy.get(seletores.diaNascimento).select(usuario.diaNascimento)
  cy.get(seletores.mesNascimento).select(usuario.mesNascimento)
  cy.get(seletores.anoNascimento).select(usuario.anoNascimento)
  cy.get(seletores.newsletter).check()
  cy.get(seletores.ofertas).check()
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome)
  cy.get(seletores.sobrenome).type(usuario.sobrenome)
  cy.get(seletores.empresa).type(usuario.empresa)
  cy.get(seletores.endereco).type(usuario.endereco)
  cy.get(seletores.complemento).type(usuario.complemento)
  cy.get(seletores.pais).select(usuario.pais)
  cy.get(seletores.estado).type(usuario.estado)
  cy.get(seletores.cidade).type(usuario.cidade)
  cy.get(seletores.cep).type(usuario.cep)
  cy.get(seletores.celular).type(usuario.celular)
  cy.get(seletores.botaoCriarConta).click()
}

function validarContaCriadaEContinuar() {
  cy.get(seletores.mensagemContaCriada)
    .should('be.visible')
    .and('contain.text', 'Account Created!')
  cy.get(seletores.botaoContinuar).click()
}

function cadastrarUsuario(usuario) {
  iniciarCadastro(usuario.nome, usuario.email)
  preencherCadastro(usuario)
  validarContaCriadaEContinuar()
}

function validarEmailJaCadastrado() {
  cy.get(seletores.mensagemErroCadastro)
    .should('be.visible')
    .and('contain.text', 'Email Address already exist!')
}

module.exports = {
  validarNovoCadastroVisivel,
  iniciarCadastro,
  validarInformacoesDaContaVisivel,
  preencherCadastro,
  validarContaCriadaEContinuar,
  cadastrarUsuario,
  validarEmailJaCadastrado
}
