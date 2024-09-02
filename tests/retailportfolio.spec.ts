import { test, expect } from "@playwright/test";

test("Retail Portfolio - Checkout Item", async ({ page, request }) => {
  await page.goto("https://www.demoblaze.com/");
  //   await page.getByRole('link', { name: 'Sign up' }).click();
  //   await page.getByLabel('Username:').click();
  //   await page.getByLabel('Username:').fill('nandan');
  //   await page.getByLabel('Username:').press('Tab');
  //   await page.getByLabel('Password:').fill('nandan');
  //   page.once('dialog', dialog => {
  //     console.log(`Dialog message: ${dialog.message()}`);
  //     dialog.dismiss().catch(() => {});
  //   });
  //   await page.getByRole('button', { name: 'Sign up' }).click();
  //   await page.getByLabel('Username:').click();
  //   await page.getByLabel('Username:').click({
  //     clickCount: 3
  //   });
  //   await page.getByLabel('Username:').fill('ngalps');
  //   await page.getByLabel('Username:').press('Tab');
  //   await page.getByLabel('Password:').fill('ngalps');
  //   page.once('dialog', dialog => {
  //     console.log(`Dialog message: ${dialog.message()}`);
  //     dialog.dismiss().catch(() => {});
  //   });
  //   await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByRole("link", { name: "Log in" }).click();

  await page.locator("#loginusername").fill("ngalps");

  await page.locator("#loginpassword").fill("ngalps");
  await page.getByRole("button", { name: "Log in" }).click();
  const itemname = "Samsung galaxy s6";
  await page.getByRole("link", { name: itemname }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await expect(page.getByRole("heading", { name: itemname })).toBeVisible();
  await page.getByRole("link", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
  await expect(page.getByRole("cell", { name: itemname })).toBeVisible();

  await page.getByRole("button", { name: "Place Order" }).click();

  await page.getByLabel("Total:").fill("NG");

  await page.getByLabel("Country:").fill("AUSTRALIA");

  await page.getByLabel("City:").fill("GEELONG");

  await page.getByLabel("Credit card:").fill("5555666677778888");

  await page.getByLabel("Month:").fill("09");

  await page.getByLabel("Year:").fill("2026");
  await page.getByRole("button", { name: "Purchase" }).click();
  //await page.waitForTimeout(1000);
  const delresponse = await request.post(
    "https://api.demoblaze.com/deletecart",
    {
      data: { cookie: "ngalps" },
    }
  );
  await expect(delresponse).toBeOK();
  await page.getByRole("button", { name: "OK" }).click();

  await page.getByRole("link", { name: "Log out" }).click();
});
