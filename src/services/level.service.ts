import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";
import {NewLevel} from "../models/Level/NewLevel";
import {Level} from "../models/Level/Level";

export const getAllLevels = async () => {
    try {
        const response = await Api.get(apiEndpoints.levels.main);
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const getLevelByIdWithTopics = async (id: number) => {
    try {
        const response = await Api.get(apiEndpoints.levels.topics(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const deleteLevelById = async (id: number) => {
    try {
        const response = await Api.delete(apiEndpoints.levels.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const addLevelAsync = async (level: NewLevel) => {
    try {
        return await Api.post(
            apiEndpoints.levels.main,
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

export const updateLevelAsync = async (level: Level) => {
    try {
        return await Api.put(
            apiEndpoints.levels.byId(level.id),
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