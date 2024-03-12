import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";

export class LevelService {
    static async getLevels() {
        try {
            const response = await Api.get(apiEndpoints.levels.main);
            return response.data;
        } catch (err: any) {
            console.log(err.message);
        }
    }

    static async getLevelWithTopics(id: number) {
        try {
            const response = await Api.get(apiEndpoints.levels.topics(id));
            return response.data;
        } catch (err: any) {
            console.log(err.message);
        }
    }

}