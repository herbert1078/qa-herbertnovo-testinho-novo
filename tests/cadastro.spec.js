const { test } = require("@playwright/test");
const { CadastroPage } = require("../pages/cadastro.page");
const { HomePage } = require("../pages/home.page");
const { novoUsuario, senha } = require("../utils/dataFactory");

test.describe("Cadastro de usuário", () => {
  let cadastroPage;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await cadastroPage.acessar();
  });

  test("Cadastro com sucesso (massa dinâmica)", async () => {
    const usuario = novoUsuario();
    await cadastroPage.preencherNome(usuario.nomeCompleto);
    await cadastroPage.preencherEmail(usuario.email);
    await cadastroPage.preencherSenha(usuario.senha);
    await cadastroPage.registrar();
    await cadastroPage.validarCadastroSucesso(usuario.nomeCompleto);
  });

  test("Cadastro acessando pela home", async ({ page }) => {
    const homePage = new HomePage(page);
    const usuario = novoUsuario();

    await homePage.acessarAplicacao();
    await homePage.acessarCadastro();

    await cadastroPage.preencherNome(usuario.nomeCompleto);
    await cadastroPage.preencherEmail(usuario.email);
    await cadastroPage.preencherSenha(usuario.senha);
    await cadastroPage.registrar();
    await cadastroPage.validarCadastroSucesso(usuario.nomeCompleto);
  });

  test("Cadastro com nome vazio", async () => {
    await cadastroPage.preencherEmail("automacao@minhaempresa.com");
    await cadastroPage.preencherSenha(senha(8));
    await cadastroPage.registrar();
    await cadastroPage.validarErroCadastro("O campo nome deve ser prenchido");
  });

  test("Cadastro com e-mail vazio", async () => {
    const usuario = novoUsuario();
    await cadastroPage.preencherNome(usuario.nomeCompleto);
    await cadastroPage.preencherSenha(usuario.senha);
    await cadastroPage.registrar();
    await cadastroPage.validarErroCadastro("O campo e-mail deve ser prenchido corretamente");
  });

  test("Cadastro com e-mail inválido", async () => {
    const usuario = novoUsuario();
    await cadastroPage.preencherNome(usuario.nomeCompleto);
    await cadastroPage.preencherEmail("automacao");
    await cadastroPage.preencherSenha(usuario.senha);
    await cadastroPage.registrar();
    await cadastroPage.validarErroCadastro("O campo e-mail deve ser prenchido corretamente");
  });

  test("Cadastro com senha vazia", async () => {
    const usuario = novoUsuario();
    await cadastroPage.preencherNome(usuario.nomeCompleto);
    await cadastroPage.preencherEmail(usuario.email);
    await cadastroPage.registrar();
    await cadastroPage.validarErroCadastro("O campo senha deve ter pelo menos 6 dígitos");
  });

  test("Cadastro com senha menor que o mínimo", async () => {
    const usuario = novoUsuario();
    await cadastroPage.preencherNome(usuario.nomeCompleto);
    await cadastroPage.preencherEmail(usuario.email);
    await cadastroPage.preencherSenha(senha(4));
    await cadastroPage.registrar();
    await cadastroPage.validarErroCadastro("O campo senha deve ter pelo menos 6 dígitos");
  });
});
