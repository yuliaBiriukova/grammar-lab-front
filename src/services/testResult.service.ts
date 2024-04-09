import {Api} from "../utils/axiosApi";
import {apiEndpoints} from "../constants/apiEndpoints";
import {NewTestResult} from "../models/TestResult/NewTestResult";

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

export const getTestResultById = async (id: number) => {
    try {
        const response = await Api.get(apiEndpoints.testResults.byId(id));
        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}