const seletores = {
  linkExcluirConta: '.shop-menu a[href="/delete_account"]',
  mensagemContaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]'
}

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click()
}

function validarContaExcluidaEContinuar() {
  cy.get(seletores.mensagemContaExcluida)
    .should('be.visible')
    .and('contain.text', 'Account Deleted!')
  cy.get(seletores.botaoContinuar).click()
}

module.exports = {
  excluirConta,
  validarContaExcluidaEContinuar
}
