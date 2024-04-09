import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";

export const getCurrentAccount = async () => {
    try {
        const response = await Api.get(apiEndpoints.account.current);
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}