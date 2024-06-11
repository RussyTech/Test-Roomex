import { Given, When, Then } from '@wdio/cucumber-framework';
import PasswordResetPage from '../pageobjects/passwordResetPage'
import LoginPage from '../pageobjects/loginPage'
import { expect, $ } from '@wdio/globals'

const pages = {
    login: LoginPage,
    reset: PasswordResetPage
}

Given(/^I am on the password (\w+) page$/, async (page) => {
    await pages[page].open()
    await expect(browser).toHaveTitle(expect.stringContaining('Roomex is a Global Hotel Booking Platform'))
    await LoginPage.ClickForgotPassword()
});

When(/^I click forgot password link$/, async() => {
    await LoginPage.ClickForgotPassword();
});

When(/^I insert email (.*)$/, async(email) => {
    await PasswordResetPage.insertEmail(email);
});

When(/^I click reset password button$/, async() => {
    await PasswordResetPage.clickResetPasswordBtn();
});

Then(/^an error message is shown (.*)$/, async(errorMsg) => {
    await PasswordResetPage.verifyAlertMessage(errorMsg);
});

Then(/^I see an error (.*)$/, async(errorMsg) => {
    await PasswordResetPage.verifyMessageVisible(errorMsg);
});
