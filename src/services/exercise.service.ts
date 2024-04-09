import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";
import {NewExercise} from "../models/Exercise/NewExercise";
import {Exercise} from "../models/Exercise/Exercise";

export const getTopicExercisesByTopicId = async (topicId: number) => {
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

export const getExerciseById = async (id: number) => {
    try {
        const response = await Api.get(apiEndpoints.exercises.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const addExerciseAsync = async (exercise: NewExercise) => {
    try {
        return await Api.post(
            apiEndpoints.exercises.main,
            exercise,
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

export const deleteExerciseById = async (id: number) => {
    try {
        const response = await Api.delete(apiEndpoints.exercises.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const updateExerciseAsync = async (level: Exercise) => {
    try {
        return await Api.put(
            apiEndpoints.exercises.byId(level.id),
            level,
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
