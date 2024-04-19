import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";
import {LoginModel} from "../models/Account/LoginModel";

export const getCurrentAccount = async () => {
    try {
        const response = await Api.get(apiEndpoints.account.current);
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const loginAsync = async (loginData: LoginModel) => {
    try {
        return await Api.post(
            apiEndpoints.account.login,
            loginData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    } catch (err: any) {
        console.log(err.message);
    }
}