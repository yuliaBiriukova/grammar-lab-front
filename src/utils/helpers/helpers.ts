const  handleServerErrors = (e: any) => {
    if (e.response?.data) {
        const { data } = e.response;

        const { message } = data;

        if (message) {
            return e.response ;
        }
    }

    return e;
}

export const helpers = {
    handleServerErrors,
}