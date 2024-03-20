import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";

export class TopicService {
    static async getTopic(id: number) {
        try {
            const response = await Api.get(apiEndpoints.topics.byId(id));
            return response.data;
        } catch (err: any) {
            console.log(err.message);
        }
    }
}