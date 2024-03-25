const { test, expect, beforeEach, describe } = require("@playwright/test");
const { blogLoginWith } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "mira",
        username: "mira",
        password: "parola",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("Log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByText("Login")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await blogLoginWith(page, "mira", "parola");
      await expect(page.getByText("Mira is logged-in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await blogLoginWith(page, "user", "parola");

      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Wrong username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("mira logged-in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await blogLoginWith(page, "mira", "parola");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByTestId("title").fill("a blog created by playwright");
      await page.getByTestId("author").fill("mira");
      await page.getByTestId("url").fill("ww.test.com");
      await page.getByRole("button", { name: "Create" }).click();

      const newBlogLocator = page.locator(
        '.blog:has-text("a blog created by playwright")'
      );
      await expect(newBlogLocator).toBeVisible();
    });

    describe("and a blog exists", () => {
      test("a new blog can be edited", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).first().click();
        await page.getByRole("button", { name: "like" }).click();

        const likesLocator = page.locator('.blog:has-text("Likes: 1")');
        await expect(likesLocator).toBeVisible();
      });

      test("it can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
    
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "Remove" }).click();

        const successMessageLocator = page.locator(".error");
        await expect(successMessageLocator).toContainText(
          "Blog deleted successfully"
        );
        await expect(
          page.getByText("a blog created by playwright")
        ).not.toBeVisible();
      });

      test("only the user who added the blog can see the delete button", async ({ page }) => {
        await blogLoginWith(page, "mira", "parola");

        await page.getByRole("button", { name: "Create new blog" }).click();
        await page.getByTestId("title").fill("a blog created by playwright for testing deletion");
        await page.getByTestId("author").fill("mira");
        await page.getByTestId("url").fill("ww.test.com");
        await page.getByRole("button", { name: "Create" }).click();

        await page.getByRole("button", { name: "Logout" }).click();
        await blogLoginWith(page, "bela", "parola");
        await page.getByRole("button", { name: "view" }).click();
        expect(page.getByRole("button", { name: "Remove" })).not.toBeVisible();
      })
    });

  });
});
