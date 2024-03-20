import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";

export class ExerciseService {
    static getTopicExercises = async (topicId: number) => {
        try {
            const response = await Api.get(apiEndpoints.exercises.main, {
                params: {
                   topicId
                }
            });
            return response.data;
        } catch (err: any) {
            console.log(err.message);
        }
    }
}