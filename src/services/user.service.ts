import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";
import qs from "qs";
import {UserFilter} from "../models/Filters/UserFilter";
import {NewUser} from "../models/User/NewUser";

export const getUsersAsync = async (filter: UserFilter = {}) => {
    try {
        const response = await Api.get(
            apiEndpoints.users.main,
            {
                params: filter,
                paramsSerializer: params => qs.stringify(params),
            }
        );

        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const deleteUserByIdAsync = async (id: string) => {
    try {
        const response = await Api.delete(apiEndpoints.users.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const addUserAsync = async (user: NewUser) => {
    try {
        return await Api.post(
            apiEndpoints.users.main,
            user,
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

export const updateUserAsync = async (user: NewUser) => {
    try {
        return await Api.put(
            apiEndpoints.users.main,
            user,
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

export const getUserByIdAsync = async (id: string) => {
    try {
        const response = await Api.get(apiEndpoints.users.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const changeUserPasswordAsync = async (userId: string, password: string) => {
    try {
        return await Api.put(
            apiEndpoints.users.password,
            {
                userId,
                password,
            }
        );
    } catch (err: any) {
        console.log(err.message);
    }
}