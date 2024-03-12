export class LocalStorageHelper {
    static get(key: string) {
        let value = localStorage.getItem(key);

        if(!value) {
            return null;
        }

        return JSON.parse(value);
    }

    static set(key: string, data: any) {
        const value = JSON.stringify(data);
        localStorage.setItem(key, value);
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }
}