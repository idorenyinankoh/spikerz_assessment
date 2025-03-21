// @ts-check
import { test, expect } from '@playwright/test';
import { AuthCommands } from '../utils/authCommands';
require('dotenv').config();
// @ts-ignore
const ClientAppPage = require('../pages/ClientAppPage');
const paths = {
  "socialConnect": "/social-connect"
}

test.beforeEach(async ({ page }) => {
  await page.goto(`${process.env.TEST_URL}${paths.socialConnect}`, {
    //  waitUntil: 'load', // wait until page is done loading
    waitUntil: 'domcontentloaded', // wait until DOMContentLoaded event is fired
  });
});

test('Successful Google login', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Spikerz | #1 Social Media Protection Service/);
  await expect(page.url()).toContain("/social-connect")

  await page.locator(ClientAppPage.youtubeTile).click();
  expect(page.url()).toContain("/social-connect/youtube")

  await page.locator(ClientAppPage.googleConnectBtn).click();

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    //page.click('button#google-sign-in') // Adjust the selector
  ]);

  expect(popup).toBeDefined();
  expect(popup.url()).toContain('google.com');
  const auth = new AuthCommands(popup);

  await auth.loginWithGoogle(process.env.G_EMAIL, process.env.G_PASSWORD);
  await auth.clickContinueBtn();
  await auth.checkBoxSelect();

  await page.waitForTimeout(1000);

  await auth.verifyBakeryTest()
  await auth.verifyBakeryUrl()
});

// Negative Test Case - Incorrect Password
test('Invalid Google Login - Invalid email', async ({ page }) => {
  await expect(page).toHaveTitle(/Spikerz | #1 Social Media Protection Service/);
  await expect(page.url()).toContain("/social-connect")

  await page.locator(ClientAppPage.youtubeTile).click();
  expect(page.url()).toContain("/social-connect/youtube")

  await page.locator(ClientAppPage.googleConnectBtn).click();

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
  ]);

  expect(popup).toBeDefined();
  expect(popup.url()).toContain('google.com');
  await popup.fill(ClientAppPage.googlePopUp.emailField, "process.env.G_EMAIL@gmail.com");

  await expect(page.locator('Couldn’t find your Google Account')).toBeVisible();
});

//Negative Test Case - Incorrect Password
test('Invalid Google Login - Wrong Password', async ({ page }) => {
  await expect(page).toHaveTitle(/Spikerz | #1 Social Media Protection Service/);
  await expect(page.url()).toContain("/social-connect")

  await page.locator(ClientAppPage.youtubeTile).click();
  expect(page.url()).toContain("/social-connect/youtube")

  await page.locator(ClientAppPage.googleConnectBtn).click();

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
  ]);

  expect(popup).toBeDefined();
  expect(popup.url()).toContain('google.com');
  const auth = new AuthCommands(popup);
  await auth.loginWithGoogle(process.env.G_EMAIL, 'wrongpassword');
  await expect(page.locator('text=Incorrect password')).toBeVisible();
});

 //Negative Test Case - Empty Fields
test('Invalid Google Login - Empty Email', async ({ page }) => {
  await expect(page).toHaveTitle(/Spikerz | #1 Social Media Protection Service/);
  await expect(page.url()).toContain("/social-connect")

  await page.locator(ClientAppPage.youtubeTile).click();
  expect(page.url()).toContain("/social-connect/youtube")

  await page.locator(ClientAppPage.googleConnectBtn).click();

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
  ]);

  expect(popup).toBeDefined();
  expect(popup.url()).toContain('google.com');
  await popup.getByText(ClientAppPage.nextBtn).click()
  //await page.pause()
  await expect(popup.getByText('Enter an email or phone number')).toBeVisible();
});

