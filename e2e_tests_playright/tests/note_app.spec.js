const { test, describe, expect, beforeEach } = require('@playwright/test')


describe("Note app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test("login form can be opened", async ({ page }) => {
    await page.getByRole("button", { name: "log in" }).click();
    await page.getByTestId("username").fill("mira");
    await page.getByTestId("password").fill("parola");

    await page.getByRole("button", { name: "log in" }).click();
    await expect(page.getByText("mira logged-in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "log in" }).click();
      await page.getByTestId("username").fill("mira");
      await page.getByTestId("password").fill("parola");
      await page.getByRole("button", { name: "log in" }).click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "save" }).click();
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });
  });
});
