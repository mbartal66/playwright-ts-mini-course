import {test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import {ErrorMessages} from "../../helpers/ErrorMessagesEnum";
import GlobalConstants from "../../helpers/GlobalConstants";

test.describe("Negative Login Scenarios", () => {
    
    let loginPage: LoginPage;

    test.beforeEach(async({page}) =>{
        loginPage = new LoginPage(page);
    })

    test("Login with locked_out_user", async({page})=>{ 
        await loginPage.loginToApplication(process.env.LOCKED_OUT_USER);
        await loginPage.valdateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL);
    })

    test("Login with incorrect username", async({page})=>{
        await loginPage.loginToApplication("user");
        await loginPage.valdateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL);
    })

    test("Login with incorrect password", async({page})=>{
        await loginPage.loginToApplication(process.env.STANDARD_USER, process.env.WRONG_PASSWORD);
        await loginPage.valdateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL);
    })
})