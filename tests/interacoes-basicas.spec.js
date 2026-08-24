const { test, expect } = require("@playwright/test");

test.describe("Interações básicas", () => {
  test("Acessar uma aplicação", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);
  });

  test("Localizar elementos", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("#user")).toBeVisible();
    await expect(page.locator("#mc_embed_signup .form-control")).toHaveCount(1);
  });

  test("Preencher campos", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#user").fill("eduardo@gmail.com");
    await page.locator("#password").fill("122355");
    await expect(page.locator("#user")).toHaveValue("eduardo@gmail.com");
  });

  test("Clicar num elemento", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#user").fill("eduardo@gmail.com");
    await page.locator("#password").fill("122355");
    await page.locator("#btnLogin").click();
  });

  test("Select", async ({ page }) => {
    await page.goto("/checkout-one");
    await page.locator("#country").selectOption("Afghanistan");
    await expect(page.locator("#country")).toHaveValue("Afghanistan");
  });

  test("Checkbox e Radio button", async ({ page }) => {
    await page.goto("/checkout-one");
    await page.locator("#materialUnchecked").check();
    await expect(page.locator("#materialUnchecked")).toBeChecked();
    await page.locator("#materialUnchecked").uncheck();
    await expect(page.locator("#materialUnchecked")).not.toBeChecked();
    await page.locator("#css").check();
    await expect(page.locator("#css")).toBeChecked();
  });

  test("Validar texto e visibilidade", async ({ page }) => {
    await page.goto("/login");
    const criarConta = page.locator("#createAccount");
    await expect(criarConta).toContainText("Ainda não tem conta?");
    await expect(criarConta).toBeVisible();
  });
});
