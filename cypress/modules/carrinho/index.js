const seletores = {
  tabelaCarrinho: '#cart_info_table',
  itensCarrinho: '#cart_info_table tbody tr',
  botaoCheckout: '.check_out'
}

function validarCarrinhoComProdutos(quantidade) {
  cy.url().should('include', '/view_cart')
  cy.get(seletores.tabelaCarrinho).should('be.visible')
  cy.get(seletores.itensCarrinho).should('have.length', quantidade)
}

function prosseguirParaCheckout() {
  cy.get(seletores.botaoCheckout).click()
}

module.exports = {
  validarCarrinhoComProdutos,
  prosseguirParaCheckout
}
