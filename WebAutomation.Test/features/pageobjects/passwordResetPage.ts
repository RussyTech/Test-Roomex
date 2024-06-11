import Page from "./page";

class PasswordResetPage extends Page{
    get emailTxtBx()
    {
        return $('input[type="email"]')
    } 
    get resetPasswordBtn()
    {
        return $('button[type="submit"]')
    }

    get returnToLoginLink()
    {
        return $('//*[text()=" Return to Login "]')
    }
    get alertMsg()
    {
        return $('rx-alert.danger');
    }
    get emailFormatErr()
    {
        return $('div.ng-star-inserted');
    }

    public async ClickReturnBackToLogin()
    {
        await this.returnToLoginLink.click()
    }

    public async clickResetPasswordBtn()
    {
        await this.resetPasswordBtn.click()
    }

    public async insertEmail(email: string)
    {
        await this.emailTxtBx.setValue(email)
    }

    public async verifyAlertMessage(expectedMessage: string) {
        const alertElement = await this.alertMsg;
        await browser.waitUntil(
            async () => {
                const isDisplayed = await alertElement.isDisplayed();
                if (isDisplayed) {
                    const alertText = await alertElement.getText();
                    return alertText.includes(expectedMessage);
                }
                return false;
            },
            {
                timeout: 5000,
                timeoutMsg: `The expected error"${expectedMessage}" is not displayed`
            }
        );
    }

    public async verifyMessageVisible(expectedMessage: string){
        const messageElement = await this.emailFormatErr;
        await browser.waitUntil(
            async () => {
                const isDisplayed = await messageElement.isDisplayed();
                if (isDisplayed) {
                    const messageText = await messageElement.getText();
                    return messageText.includes(expectedMessage);
                }
                return false;
            },
            {
                timeout: 5000,
                timeoutMsg: `Error message "${expectedMessage}" is not visible`
            }
        );
    }

    
}

export default new PasswordResetPage()