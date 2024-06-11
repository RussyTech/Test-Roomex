import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/loginPage'
import { expect, $ } from '@wdio/globals'
import PasswordResetPage from '../pageobjects/passwordResetPage';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
    await expect(browser).toHaveTitle(expect.stringContaining('Roomex is a Global Hotel Booking Platform'))
    await LoginPage.ConfirmLoginPage();
});

When(/^I click login button$/, async() => {
    await LoginPage.clickLoginBtn();
});

Then(/^I verify that error messages are displayed for both fields$/, async() => {
    await LoginPage.verifyBothError();
});

When(/^I login with (.*) and (.*)$/, async(username, password) => {
    await LoginPage.DoLogin(username, password);
});

Then(/^I should see an error message (.*)$/, async(errorMsg) => {
   await LoginPage.verifyAlertMessage(errorMsg)
});


Then(/^error message says (.*)$/, async (errorMsg) => {
    await LoginPage.verifyErrorMessage(errorMsg);
});

Then(/^I am directed to the reset password page$/, async() => {
    await LoginPage.ConfirmForgotPasswordPage();
});

When(/^I click return to login link$/, async() => {
    await PasswordResetPage.ClickReturnBackToLogin();
});

Then(/^I am directed back to the login page$/, async() => {
    await LoginPage.ConfirmLoginPage();
});
When(/^I click forgot password link$/, async() => {
    await LoginPage.ClickForgotPassword();
});