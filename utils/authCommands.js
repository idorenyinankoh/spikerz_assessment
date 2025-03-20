import { expect } from '@playwright/test';
const ClientAppPage = require('../pages/ClientAppPage');

export class AuthCommands {
    constructor(page) {
        this.page = page;
        // this.googleSignInBtn = 'button[aria-label="Sign in with Google"]';
        // this.emailField = 'input[type="email"]';
        // this.passwordField = 'input[type="password"]';
        // this.nextButton = 'text=Next';
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async loginWithGoogle(email, password) {

        // Control Google Login Window (Avoid Popup)
        const googlePage = await this.page;
        await googlePage.waitForLoadState();

        await googlePage.fill(ClientAppPage.googlePopUp.emailField, process.env.G_EMAIL);
        await googlePage.getByText(ClientAppPage.googlePopUp.nextBtn).click();
        await googlePage.fill(ClientAppPage.googlePopUp.passwordField, process.env.G_PASSWORD);
        await googlePage.getByText(ClientAppPage.googlePopUp.nextBtn).click();

        await googlePage.waitForURL(/.*accounts.google.com.*/, { timeout: 5000 });
        await googlePage.close();
    }

    async clickContinueButton() {
        await googlePage.locator(ClientAppPage.continueBtn).waitFor({ state: 'visible' });
        await googlePage.locator(ClientAppPage.continueBtn).click();
    }

    async checkSelectAllCheckbox() {
        await googlePage.locator(ClientAppPage.selectChecker).waitFor({ state: 'visible' });
        await googlePage.locator(ClientAppPage.selectChecker).check();
        await expect(googlePage.locator(ClientAppPage.selectChecker)).toBeChecked();
    }

    async verifyBakeryShopVisible() {
        await expect(googlePage.getByText(ClientAppPage.bakeryText)).toBeVisible({ timeout: 10000 });
    }

    async verifyUrl() {
        await googlePage.waitForURL(`${process.env.BASE_URL}/social-connect/youtube`, { timeout: 15000 });
        const currentUrl = googlePage.url();
        expect(currentUrl).toContain('social-connect/youtube');
    }



}