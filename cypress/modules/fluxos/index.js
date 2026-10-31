const menu = require('../menu')
const cadastro = require('../cadastro')

function prepararUsuarioCadastrado(usuario) {
  menu.acessarLoginCadastro()
  cadastro.cadastrarUsuario(usuario)
  menu.efetuarLogout()
}

module.exports = {
  prepararUsuarioCadastrado
}
