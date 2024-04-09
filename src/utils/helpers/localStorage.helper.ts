export const getItemFromLocalStorage = (key: string) => {
    let value = localStorage.getItem(key);

    if(!value) {
        return null;
    }

    return JSON.parse(value);
}

export const setItemInLocalStorage = (key: string, data: any) => {
    const value = JSON.stringify(data);
    localStorage.setItem(key, value);
}

export const removeItemFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}