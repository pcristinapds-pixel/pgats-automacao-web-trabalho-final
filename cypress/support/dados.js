const { faker } = require('@faker-js/faker')
const usuarioBase = require('../fixtures/usuario.json')

function criarUsuario() {
  const primeiroNome = faker.person.firstName()
  const sobrenome = faker.person.lastName()
  const prefixoEmail = primeiroNome.toLowerCase().replace(/[^a-z]/g, '')

  return {
    ...usuarioBase,
    nome: `${primeiroNome} ${sobrenome}`,
    email: `${prefixoEmail}.${Date.now()}@pgats.com`,
    primeiroNome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    complemento: faker.location.secondaryAddress(),
    estado: faker.location.state(),
    cidade: faker.location.city(),
    cep: faker.location.zipCode('#####'),
    celular: faker.string.numeric(11)
  }
}

module.exports = {
  criarUsuario
}
