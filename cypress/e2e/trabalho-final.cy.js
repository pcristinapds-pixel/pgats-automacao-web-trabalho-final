const menu = require('../modules/menu')
const cadastro = require('../modules/cadastro')
const login = require('../modules/login')
const conta = require('../modules/conta')
const produtos = require('../modules/produtos')
const carrinho = require('../modules/carrinho')
const checkout = require('../modules/checkout')
const inscricao = require('../modules/inscricao')
const fluxos = require('../modules/fluxos')
const { criarUsuario } = require('../support/dados')
const pagamento = require('../fixtures/pagamento.json')
const dadosProdutos = require('../fixtures/produtos.json')

describe('Automation Exercise - Trabalho Final', () => {
  let usuario

  beforeEach(() => {
    usuario = criarUsuario()
    menu.acessarHome()
    menu.validarHomeVisivel()
  })

  it('Test Case 1: Registrar usuário', () => {
    menu.acessarLoginCadastro()
    cadastro.validarNovoCadastroVisivel()
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.validarInformacoesDaContaVisivel()
    cadastro.preencherCadastro(usuario)
    cadastro.validarContaCriadaEContinuar()
    menu.validarUsuarioLogado(usuario.nome)
    conta.excluirConta()
    conta.validarContaExcluidaEContinuar()
  })

  it('Test Case 2: Login com e-mail e senha corretos', () => {
    fluxos.prepararUsuarioCadastrado(usuario)

    menu.acessarLoginCadastro()
    login.validarLoginVisivel()
    login.efetuarLogin(usuario.email, usuario.senha)
    menu.validarUsuarioLogado(usuario.nome)
    conta.excluirConta()
    conta.validarContaExcluidaEContinuar()
  })

  it('Test Case 3: Login com e-mail e senha incorretos', () => {
    menu.acessarLoginCadastro()
    login.validarLoginVisivel()
    login.efetuarLogin(usuario.email, usuario.senha)
    login.validarMensagemDeErroLogin()
  })

  it('Test Case 4: Logout do usuário', () => {
    fluxos.prepararUsuarioCadastrado(usuario)

    menu.acessarLoginCadastro()
    login.validarLoginVisivel()
    login.efetuarLogin(usuario.email, usuario.senha)
    menu.validarUsuarioLogado(usuario.nome)
    menu.efetuarLogout()
    login.validarRedirecionamentoParaLogin()
  })

  it('Test Case 5: Cadastrar usuário com e-mail já existente', () => {
    fluxos.prepararUsuarioCadastrado(usuario)

    menu.acessarLoginCadastro()
    cadastro.validarNovoCadastroVisivel()
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.validarEmailJaCadastrado()
  })

  it('Test Case 8: Verificar todos os produtos e a página de detalhes do produto', () => {
    menu.acessarProdutos()
    produtos.validarTodosProdutosVisiveis()
    produtos.acessarPrimeiroProduto()
    produtos.validarDetalhesDoProduto()
  })

  it('Test Case 9: Pesquisar produto', () => {
    menu.acessarProdutos()
    produtos.validarTodosProdutosVisiveis()
    produtos.pesquisarProduto(dadosProdutos.termoPesquisa)
    produtos.validarResultadoDaPesquisa()
  })

  it('Test Case 10: Verificar inscrição na página inicial', () => {
    inscricao.validarInscricaoVisivel()
    inscricao.inscreverEmail(usuario.email)
    inscricao.validarInscricaoRealizada()
  })

  it('Test Case 15: Fazer pedido cadastrando antes do checkout', () => {
    menu.acessarLoginCadastro()
    cadastro.cadastrarUsuario(usuario)
    menu.validarUsuarioLogado(usuario.nome)
    menu.acessarProdutos()
    produtos.adicionarProdutosAoCarrinho(dadosProdutos.idsCarrinho)
    menu.acessarCarrinho()
    carrinho.validarCarrinhoComProdutos(dadosProdutos.idsCarrinho.length)
    carrinho.prosseguirParaCheckout()
    checkout.validarEnderecoERevisaoDoPedido(usuario, dadosProdutos.idsCarrinho.length)
    checkout.finalizarPedido(pagamento.comentario)
    checkout.efetuarPagamento(usuario.nome, pagamento)
    checkout.validarPedidoConfirmado()
    conta.excluirConta()
    conta.validarContaExcluidaEContinuar()
  })

  it('Test Case 16: Fazer pedido fazendo login antes do checkout', () => {
    fluxos.prepararUsuarioCadastrado(usuario)

    menu.acessarLoginCadastro()
    login.efetuarLogin(usuario.email, usuario.senha)
    menu.validarUsuarioLogado(usuario.nome)
    menu.acessarProdutos()
    produtos.adicionarProdutosAoCarrinho(dadosProdutos.idsCarrinho)
    menu.acessarCarrinho()
    carrinho.validarCarrinhoComProdutos(dadosProdutos.idsCarrinho.length)
    carrinho.prosseguirParaCheckout()
    checkout.validarEnderecoERevisaoDoPedido(usuario, dadosProdutos.idsCarrinho.length)
    checkout.finalizarPedido(pagamento.comentario)
    checkout.efetuarPagamento(usuario.nome, pagamento)
    checkout.validarPedidoConfirmado()
    conta.excluirConta()
    conta.validarContaExcluidaEContinuar()
  })
})
