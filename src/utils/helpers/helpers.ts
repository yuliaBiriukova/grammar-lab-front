export const  handleServerErrors = (e: any) => {
    if (e.response?.data) {
        return e.response;
    }

    return e;
}

export const checkIsStringEmpty = (value: string) => value.trim() === '';

export const getLevelDisplayName = (code: string, name: string) => {
    return `${code}: ${name}`;
}