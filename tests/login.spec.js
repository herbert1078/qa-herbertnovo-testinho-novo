const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");

test.describe("Login", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.acessar();
  });

  test("Login com sucesso", async () => {
    await loginPage.preencheEmail("meu-email@teste.com");
    await loginPage.preencheSenha("121212");
    await loginPage.fazerLogin();
    await loginPage.validarLoginSucesso();
  });

  test("Login com e-mail inválido", async () => {
    await loginPage.preencheEmail("23762732736");
    await loginPage.preencheSenha("121212");
    await loginPage.fazerLogin();
    await loginPage.validarErroLogin("E-mail inválido.");
  });

  test("Login com e-mail vazio", async () => {
    await loginPage.preencheSenha("121212");
    await loginPage.fazerLogin();
    await loginPage.validarErroLogin("E-mail inválido.");
  });

  test("Login com senha vazia", async () => {
    await loginPage.preencheEmail("eduardo.finotti@qazando.com");
    await loginPage.fazerLogin();
    await loginPage.validarErroLogin("Senha inválida.");
  });
});
