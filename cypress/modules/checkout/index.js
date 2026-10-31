const seletores = {
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  itensPedido: '#cart_info tbody tr[id^="product-"]',
  comentario: 'textarea[name="message"]',
  botaoFinalizarPedido: 'a[href="/payment"]',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  tituloPedidoConfirmado: '[data-qa="order-placed"]'
}

function validarEnderecoERevisaoDoPedido(usuario, quantidadeProdutos) {
  cy.get(seletores.enderecoEntrega)
    .should('be.visible')
    .and('contain.text', usuario.primeiroNome)
    .and('contain.text', usuario.sobrenome)
    .and('contain.text', usuario.endereco)
    .and('contain.text', usuario.cidade)
    .and('contain.text', usuario.estado)
    .and('contain.text', usuario.cep)
    .and('contain.text', usuario.pais)
    .and('contain.text', usuario.celular)
  cy.get(seletores.enderecoCobranca)
    .should('be.visible')
    .and('contain.text', usuario.endereco)
  cy.get(seletores.itensPedido).should('have.length', quantidadeProdutos)
}

function finalizarPedido(comentario) {
  cy.get(seletores.comentario).type(comentario)
  cy.get(seletores.botaoFinalizarPedido).click()
}

function efetuarPagamento(nomeTitular, pagamento) {
  cy.get(seletores.nomeCartao).type(nomeTitular)
  cy.get(seletores.numeroCartao).type(pagamento.numeroCartao)
  cy.get(seletores.cvc).type(pagamento.cvc)
  cy.get(seletores.mesValidade).type(pagamento.mesValidade)
  cy.get(seletores.anoValidade).type(pagamento.anoValidade)
  cy.get(seletores.botaoPagar).click()
}

function validarPedidoConfirmado() {
  cy.get(seletores.tituloPedidoConfirmado)
    .should('be.visible')
    .parent()
    .should('contain.text', 'Congratulations! Your order has been confirmed!')
}

module.exports = {
  validarEnderecoERevisaoDoPedido,
  finalizarPedido,
  efetuarPagamento,
  validarPedidoConfirmado
}
