const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.campoEmail = page.locator("#user");
    this.campoSenha = page.locator("#password");
    this.botaoLogin = page.locator("#btnLogin");
    this.tituloAlerta = page.locator("#swal2-title");
    this.mensagemErro = page.locator(".invalid_input");
    this.criarConta = page.locator("#createAccount");
  }

  async acessar() {
    await this.page.goto("/login");
  }

  async preencheEmail(email) {
    await this.campoEmail.fill(email);
  }

  async preencheSenha(senha) {
    await this.campoSenha.fill(senha);
  }

  async fazerLogin() {
    await this.botaoLogin.click();
  }

  async login(email, senha) {
    await this.acessar();
    await this.preencheEmail(email);
    await this.preencheSenha(senha);
    await this.fazerLogin();
  }

  async validarLoginSucesso() {
    await expect(this.tituloAlerta).toHaveText("Login realizado");
  }

  async validarErroLogin(mensagem) {
    await expect(this.mensagemErro).toHaveText(mensagem);
  }
}

module.exports = { LoginPage };
