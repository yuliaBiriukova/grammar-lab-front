import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";

export class AccountService {
    static async getCurrentAccount() {
        try {
            const response = await Api.get(apiEndpoints.account.current);
            return response.data;
        } catch (err: any) {
            console.log(err.message);
        }
    }
}