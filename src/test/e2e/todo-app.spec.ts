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

  test("Todoの削除", async ({ page }) => {
    await page.fill('input[placeholder="Add a new task"]', "Delete this Task");
    await page.click("text=Add");

    await expect(page.locator("text=Delete this Task").last()).toBeVisible();

    await page.locator('button[aria-label="削除"]').last().click();
    await expect(
      page.locator('text="Delete this Task"').last()
    ).not.toBeVisible();
  });
});
