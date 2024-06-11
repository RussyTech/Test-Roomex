import Page from "./page"

class LoginPage extends Page{
    get emailTxtBx(){
        return $('input[type="email"]')
    }
    get passwordTxtBx(){
        return $('input[type="password"]')
    }
    get loginBtn(){
        return $('button[type="submit"]')
    }
    get errorAlert(){
        return $('.danger')
    }
    get requiredFieldsErrMsg(){
        return $$('div[rx-error] .ng-star-inserted')
    }
    get emailRequiredErr(){
        return $('//*[text()=" Email is required "]')
    }
    get passwordRequiredErr(){
        return $('//*[text()=" Password is required "]')
    }
    get forgotPasswordLink(){
        return $('//*[text()=" Forgot password? "]')
    }
    get resetPasswprdTxt(){
        return $('//*[text()="Reset Password"]')
    }
    get loginText(){
        return $('//*[text()="Login"]')
    }


    public async ConfirmForgotPasswordPage()
    {
        await this.resetPasswprdTxt.isDisplayed()
    }
    public async ConfirmLoginPage()
    {
        await this.loginText.isDisplayed()
    }


    
    public async ClickForgotPassword()
    {
        await this.forgotPasswordLink.click()
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('forgot-password'),
            {
                timeout: 5000,
                timeoutMsg: 'Url does not contain /"forgot-password"'
            }
        );
    }


    public async DoLogin(emailAddress: string, password: string)
    {
        await (await this.emailTxtBx).waitForDisplayed();
        await this.emailTxtBx.setValue(emailAddress);

        await (await this.passwordTxtBx).waitForDisplayed();
        await this.passwordTxtBx.setValue(password);

        await (await this.loginBtn).waitForClickable();
        await this.loginBtn.click();
    }

    public async verifyBothError() {
        await browser.waitUntil(
            async () => {
                const errorMessages = await this.requiredFieldsErrMsg;
                return errorMessages.length === 2;
            },
            {
                timeout: 5000,
                timeoutMsg: 'Validation error message not visible'
            }
        );
    }
    
    public async verifyErrorMessage(errorMsg: string){

        const isEmailErrorVisible = await this.emailRequiredErr.isDisplayed();
        if (isEmailErrorVisible) {
            const emailErrorText = await this.emailRequiredErr.getText();
            await expect(emailErrorText).toContain(errorMsg);
            return;
        }

        const isPasswordErrorVisible = await this.passwordRequiredErr.isDisplayed();
        if (isPasswordErrorVisible) {
            const passwordErrorText = await this.passwordRequiredErr.getText();
            await expect(passwordErrorText).toContain(errorMsg);
            return;
        }
        throw new Error('Expected error message not visible');
    }

    public async verifyAlertMessage(errorMsg: string) {
        const errorAlertText = await this.errorAlert.getText();
        expect(errorAlertText).toContain(errorMsg);
    }

    public async clickLoginBtn()
    {
        await (await this.loginBtn).waitForClickable();
        await this.loginBtn.click()
    }

    public async failedLoginErrMsg()
    {
        await browser.waitUntil(
            async () => (await this.loginBtn.getText()) === 'Login',
            {
                timeout: 5000,
                timeoutMsg: 'No error message'
            }
        );
        await expect(this.errorAlert).toHaveText(
            expect.stringContaining('Login failed. Please check that you have entered the correct details.'))
    }


    public async doLoginNoBody(errEmailMsg: string, errPasswordMsg: string){
        await browser.waitUntil(
            async () => {
                const elements = await this.requiredFieldsErrMsg;
                console.log(`Found ${elements.length} elements`);

                if (elements.length < 2) {
                    return false;
                }

                const text0 = await elements[0].getText();
                const text1 = await elements[1].getText();
                console.log(`Text of element 0: ${text0}`);
                console.log(`Text of element 1: ${text1}`);

                return text0 === errEmailMsg && text1 === errPasswordMsg;
            },
            {
                timeout: 5000,
                timeoutMsg: 'The required error messages did not appear'
            }
        );
    }
    
}

export default new LoginPage();