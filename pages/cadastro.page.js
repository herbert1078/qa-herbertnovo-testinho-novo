const { expect } = require("@playwright/test");

class CadastroPage {
  constructor(page) {
    this.page = page;
    this.campoNome = page.locator("#user");
    this.campoEmail = page.locator("#email");
    this.campoSenha = page.locator("#password");
    this.botaoRegistrar = page.locator("#btnRegister");
    this.tituloAlerta = page.locator("#swal2-title");
    this.mensagemAlerta = page.locator("#swal2-html-container");
    this.mensagemErro = page.locator("#errorMessageFirstName");
  }

  async acessar() {
    await this.page.goto("/register");
  }

  async preencherNome(nome) {
    await this.campoNome.fill(nome);
  }

  async preencherEmail(email) {
    await this.campoEmail.fill(email);
  }

  async preencherSenha(senha) {
    await this.campoSenha.fill(senha);
  }

  async registrar() {
    await this.botaoRegistrar.click();
  }

  async validarCadastroSucesso(nomeCompleto) {
    await expect(this.tituloAlerta).toHaveText("Cadastro realizado!");
    await expect(this.mensagemAlerta).toHaveText(`Bem-vindo ${nomeCompleto}`);
  }

  async validarErroCadastro(mensagem) {
    await expect(this.mensagemErro).toHaveText(mensagem);
  }
}

module.exports = { CadastroPage };
