import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";
import {NewTestResult} from "../models/TestResult/NewTestResult";
import {TestResultsFilter} from "../models/Filters/TestResultsFilter";
import qs from "qs";

export const addTestResultAsync = async (testResult: NewTestResult) => {
    try {
        return await Api.post(
            apiEndpoints.testResults.main,
            testResult
        );
    } catch (err: any) {
        console.log(err.message);
    }
}

export const getTestResultByIdAsync = async (id: number) => {
    try {
        const response = await Api.get(apiEndpoints.testResults.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}

export const getTestResultsAsync = async (filter: TestResultsFilter = {}) => {
    try {
        const response = await Api.get(
            apiEndpoints.testResults.main,
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

export const getBestTestResultsAsync = async (filter: TestResultsFilter = {}) => {
    try {
        const response = await Api.get(
            apiEndpoints.testResults.best,
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

