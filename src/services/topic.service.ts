import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";
import {NewTopic} from "../models/Topic/NewTopic";
import {Topic} from "../models/Topic/Topic";
import qs from "qs";

export const getTopicById = async (id: number) => {
    try {
        const response = await Api.get(apiEndpoints.topics.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const deleteTopicById = async (id: number) => {
    try {
        const response = await Api.delete(apiEndpoints.topics.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const addTopicAsync = async (topic: NewTopic) => {
    try {
        return await Api.post(
            apiEndpoints.topics.main,
            topic,
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

export const updateTopicAsync = async (topic: Topic) => {
    try {
        return await Api.put(
            apiEndpoints.topics.byId(topic.id),
            topic,
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

export const getTopicsByNameAsync = async (query: string) => {
    try {
        const response = await Api.get(
            apiEndpoints.topics.search,
            {
                params: {query},
                paramsSerializer: params => qs.stringify(params),
            }
        );

        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}