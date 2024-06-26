import axios from "axios";
import qs from "qs";
import {apiBaseUrl} from "../constants/apiEndpoints";
import {handleServerErrors} from "./helpers/helpers";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../app/hooks";
import {routes} from "../constants/routes";
import {getAccessToken, logout} from "../services/auth.service";

const headers = {
    "Content-Type": "application/json",
}

export const  Api = axios.create({
    baseURL: apiBaseUrl,
    headers,
    paramsSerializer: function (params) {
        return qs.stringify(params);
    }
});

export const AxiosInterceptor = ({ children }: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isSet, setIsSet] = useState(false);

    useEffect(() => {
        const requestInterceptor = Api.interceptors.request.use(config => {
            let accessToken = getAccessToken();

            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }

            return config;
        });

        const responseInterceptor = Api.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            logout();
                            navigate(routes.login);
                            break;

                        default:
                            break;
                    }
                }
                return handleServerErrors(err);
            }
        );

        setIsSet(true);

        return () => {
            Api.interceptors.request.eject(requestInterceptor);
            Api.interceptors.response.eject(responseInterceptor);
        }
    }, [dispatch]);

    return isSet && children;
}