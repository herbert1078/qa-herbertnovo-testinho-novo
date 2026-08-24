class HomePage {
  constructor(page) {
    this.page = page;
    this.menu = page.locator(".right_list_fix");
  }

  async acessarAplicacao() {
    await this.page.goto("/");
  }

  async acessarCadastro() {
    await this.menu.getByText("Cadastro").click();
  }
}

module.exports = { HomePage };
