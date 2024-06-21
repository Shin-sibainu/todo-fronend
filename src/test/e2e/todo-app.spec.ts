import test, { expect } from "@playwright/test";

test.describe("Todo Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://todo-fronend.pages.dev/");
  });

  test("Todoの追加", async ({ page }) => {
    await page.fill('input[placeholder="Add a new task"]', "Learn Playwright");
    await page.click("text=Add");

    await expect(page.locator("text=Learn Playwright").last()).toBeVisible();
  });
});
