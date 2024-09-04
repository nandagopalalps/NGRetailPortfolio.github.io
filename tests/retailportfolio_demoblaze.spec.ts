import { test, expect } from "@playwright/test";

test("Retail Portfolio - Checkout Item", async ({ page, request }) => {
  await page.goto("https://www.demoblaze.com/");
  await page.getByRole("link", { name: "Log in" }).click();
  await page.locator("#loginusername").fill("ngalps");
  await page.locator("#loginpassword").fill("ngalps");
  await page.getByRole("button", { name: "Log in" }).click();
  const itemresponse = await request.get("https://api.demoblaze.com/entries");
  console.log(`Item Response:${itemresponse.status()}`);
  console.log(await itemresponse.headersArray());
  const items = await itemresponse.json();
  const firstitem = items["Items"][0];
  console.log(firstitem["title"]);
  const itemname = firstitem["title"];
  const itemprice = firstitem["price"];
  await page.getByRole("link", { name: itemname }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await expect(page.getByRole("heading", { name: itemname })).toBeVisible();
  const actualprice = page.getByRole("heading", {
    name: `$${itemprice} *includes tax`,
  });
  await expect(actualprice).toBeVisible();
  await page.getByRole("link", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
  await expect(page.getByRole("cell", { name: itemname })).toBeVisible();
  await expect(page.getByRole("cell", { name: itemprice })).toBeVisible();
  await page.getByRole("button", { name: "Place Order" }).click();
  await expect(page.getByText("Total:")).toContainText(`${itemprice}`);
  await page.getByLabel("Total:").fill("NG");
  await page.getByLabel("Country:").fill("AUSTRALIA");
  await page.getByLabel("City:").fill("GEELONG");
  await page.getByLabel("Credit card:").fill("5555666677778888");
  await page.getByLabel("Month:").fill("09");
  await page.getByLabel("Year:").fill("2026");
  await page.getByRole("button", { name: "Purchase" }).click();

  const delresponse = await request.post(
    "https://api.demoblaze.com/deletecart",
    {
      data: { cookie: "ngalps" },
    }
  );
  await expect(delresponse).toBeOK();
  await expect(page.getByText(`${itemprice} USD`)).toBeVisible();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("link", { name: "Log out" }).click();
});
